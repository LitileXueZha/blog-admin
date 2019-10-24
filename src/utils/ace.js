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
// let $mathjax;
const regMermaid = /<div class="mermaid">[\s\S]+?<\/div>/gm;
const regMathJax = /(\$|\\\()[\s\S]+?(\$|\\\))/gm;
const renderer = new marked.Renderer();

/**
 * 使用 mermaid.js 渲染流程图
 *
 * @param {Object} data 渲染数据
 */
function renderMermaid({ html, prevHtml }) {
    const $mermaids = document.querySelectorAll('.mermaid');

    // 没有 mermaid 代码
    if ($mermaids.length === 0) return;

    // 动态加载
    if (!mermaid) {
        import(/* webpackChunkName: "mermaid" */ 'mermaid').then((res) => {
            mermaid = res.default;
            mermaid.init();
        }).catch(() => {});
        return;
    }

    const arrCode = html.match(regMermaid);
    const arrPrevCode = prevHtml.match(regMermaid);

    if (arrPrevCode) {
        Array.from($mermaids).forEach(($item, i) => {
            // 只有改变了 mermaid 代码才会重新渲染
            if (arrCode[i] !== arrPrevCode[i]) {
                // mermaid 在 init 后会加上 `data-processed` 属性，表明已渲染过，以后
                // 不会重新渲染，只有移除此属性才会生效
                // @see https://github.com/knsv/mermaid/issues/29
                $item.removeAttribute('data-processed');
            }
        });
    }
    try {
        mermaid.init(undefined, $mermaids);
    } catch (e) { console.error(e); }
}

function renderMathJax() {
    const $mathjax = document.querySelectorAll('.mathjax');

    // 没有 latex 公式
    if ($mathjax.length === 0) return;

    if (!MathJax) {
        // 目前发现只能通过 cdn 方式引入。本地提供不支持模块化
        const $script = document.createElement('script');

        $script.src = 'https://unpkg.com/mathjax@3.0.0/es5/tex-chtml.js';
        $script.async = true;
        // mathjax v3 的配置
        window.MathJax = {
            startup: {
                typeset: false,
            },
            tex: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
            },
        };
        $script.addEventListener('load', () => {
            MathJax = window.MathJax;
            MathJax.typesetPromise($mathjax).catch(MathJax.typesetClear);
        });

        document.body.appendChild($script);
        // import(/* webpackChunkName: "MathJax" */'mathjax').then((res) => {
        //     MathJax = res.default;
        //     MathJax.init({
        //         loader: {
        //             loader: ['input/tex', 'output/svg'],
        //         },
        //         tex: {
        //             inlineMath: [['$', '$'], ['\\(', '\\)']],
        //             packages: ['base', 'ams'],
        //         },
        //     });
        // });
        return;
    }

    MathJax.typesetClear();
    MathJax.typesetPromise($mathjax);
}

// monkey patch 猴子补丁
renderer.defaultCode = renderer.code;
renderer.code = (code, lang) => {
    if (code.match(/^(graph|sequenceDiagram)/)) {
        return `<div class="mermaid">${code}</div>`;
    }

    return renderer.defaultCode(code, lang);
};
renderer.defaultCodespan = renderer.codespan;
renderer.codespan = (code) => {
    if (code.match(regMathJax)) {
        return `<span class="mathjax">${code}</span>`;
    }

    return renderer.defaultCodespan(code);
};

ace.config.setModuleUrl('ace/mode/markdown', aceModeMarkdown);
ace.config.setModuleUrl('ace/theme/xcode', aceThemeXcode);
marked.setOptions({
    renderer,
    highlight: function highlight(code, lang) {
        if (hljs.getLanguage(lang)) {
            return hljs.highlight(lang, code).value;
        }

        return code;
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
        // scrollPastEnd: 1,
    });

    return editor;
};
ace.listen = (editor, listener) => {
    let timer = null;
    const cacheArticle = localStorage.getItem('cache_article') || '';
    const cacheArticleHtml = localStorage.getItem('cache_article_html') || '';

    if (cacheArticle) {
        editor.setValue(cacheArticle);
        editor.clearSelection();
        setTimeout(() => {
            listener(cacheArticleHtml, (prevHtml) => {
                renderMermaid({ html: cacheArticleHtml, prevHtml });
                renderMathJax();
            });
        }, 300);
    }
    editor.on('change', () => {
        clearTimeout(timer);

        // 简易防抖
        timer = setTimeout(() => {
            const content = editor.getValue();
            const html = marked(content);

            localStorage.setItem('cache_article', content);
            localStorage.setItem('cache_article_html', html);
            listener(html, (prevHtml) => {
                renderMermaid({ html, prevHtml });
                renderMathJax();
            });
        }, 800);
    });
};

export default ace;
