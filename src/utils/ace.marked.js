import marked from 'marked';

import hljs from './ace.marked.highlight.js';

const regMathJax = /(\$|\\\()[\s\S]+?(\$|\\\))/gm;
const renderer = new marked.Renderer();

// monkey patch 猴子补丁
// 1. mermaid 转化
renderer.defaultCode = renderer.code;
renderer.code = (code, lang) => {
    if (code.match(/^(graph|sequenceDiagram)/)) {
        return `<div class="mermaid">${code}</div>`;
    }

    return renderer.defaultCode(code, lang);
};
// 2. mathjax 转化
renderer.defaultCodespan = renderer.codespan;
renderer.codespan = (code) => {
    if (code.match(regMathJax)) {
        return `<span class="mathjax">${code}</span>`;
    }

    return renderer.defaultCodespan(code);
};
// 3. 文章内容里标题转化降低一个层级
renderer.defaultHeading = renderer.heading;
renderer.heading = (text, level, raw, slugger) => {
    if (level < 6) {
        level += 1;
    }

    return renderer.defaultHeading(text, level, raw, slugger);
};

// 推荐的可扩展写法，使用 marked.use()
const taskListRe = {
    listitem(text, task) {
        if (task) {
            return `<li class="task-list-item">${text}</li>\n`;
        }

        return `<li>${text}</li>`;
    },
};

marked.setOptions({
    renderer,
    highlight: function highlight(code, lang) {
        if (hljs.getLanguage(lang)) {
            return hljs.highlight(lang, code).value;
        }

        return code;
    },
});
marked.use({ renderer: taskListRe });

export default marked;
