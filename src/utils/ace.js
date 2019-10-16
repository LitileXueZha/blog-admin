/**
 * ace-editor 代码编辑器
 *
 * 目前仅配置了 markdown 语言
 *
 * @see https://github.com/ajaxorg/ace
 */
import ace from 'ace-builds';
import aceModeMarkdown from 'ace-builds/src-noconflict/mode-markdown';
import aceThemeXcode from 'ace-builds/src-noconflict/theme-xcode';
import marked from 'marked';
import 'highlight.js/styles/atom-one-light.css';
import hljs from 'highlight.js/lib/highlight';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
import markdown from 'highlight.js/lib/languages/markdown';
import nginx from 'highlight.js/lib/languages/nginx';
import http from 'highlight.js/lib/languages/http';
import php from 'highlight.js/lib/languages/php';
import sql from 'highlight.js/lib/languages/sql';

import Msg from '../components/message';

// 高亮语法
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('http', http);
hljs.registerLanguage('php', php);
hljs.registerLanguage('sql', sql);

let mermaid;
let MathJax;
const renderer = new marked.Renderer();

// monkey patch 猴子补丁
renderer.defaultCode = renderer.code;
renderer.code = (code, lang) => {
    if (code.match(/^(graph|sequenceDiagram)/)) {
        if (!mermaid) {
            import(/* webpackChunkName: "mermaid" */ 'mermaid').then((res) => {
                mermaid = res.default;
                mermaid.init();
            });
            return `<div class="mermaid">${code}</div>`;
        }
        console.log(mermaid.render('hello', code))
        return `<div class="mermaid">${code}</div>`;
    }

    return renderer.defaultCode(code, lang);
};

ace.config.setModuleUrl('ace/mode/markdown', aceModeMarkdown);
ace.config.setModuleUrl('ace/theme/xcode', aceThemeXcode);
marked.setOptions({
    highlight: function highlight(code, lang) {
        try {
            return hljs.highlight(lang, code).value;
        } catch (e) {
            console.warn(e);
            return code;
        }
    },
});

ace.init = (selector) => {
    const editor = ace.edit(selector, {
        mode: 'ace/mode/markdown',
        theme: 'ace/theme/xcode',
        maxLines: 1000,
        printMarginColumn: 120,
        wrap: true,
        foldStyle: 'markbegin',
    });

    return editor;
};
ace.listen = (editor, listener) => {
    let timer = null;

    editor.on('change', () => {
        clearTimeout(timer);

        // 简易防抖
        timer = setTimeout(() => {
            const content = editor.getValue();
            const html = marked(content, { renderer });

            listener(html, () => {
                console.log(mermaid);
                if (mermaid) mermaid.init(undefined, document.querySelectorAll('.mermaid'));
            });
        }, 800);
    });
};

export default ace;
