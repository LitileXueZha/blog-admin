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
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

let mermaid;
let MathJax;
const renderer = new marked.Renderer();

renderer.code = (code) => {

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
            const html = marked(content);

            listener(html, () => {

            });
        }, 800);
    });
};

export default ace;
