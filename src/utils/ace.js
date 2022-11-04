/* eslint-disable max-classes-per-file */
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

import marked from './ace.marked.js';
import { renderMermaid, renderMathJax } from './ace.addons.js';
import { debounce } from './functions.js';

const ACE_CONFIGS = {
    mode: 'ace/mode/markdown',
    theme: 'ace/theme/xcode',
    maxLines: 1000,
    printMarginColumn: 120,
    wrap: true,
    foldStyle: 'markbegin',
    fontFamily: [
        'SFMono-Regular',
        'Consolas',
        'Monaco',
        '"Liberation Mono"', // Linux
        'Menlo',
        'Courier',
        '"Microsoft YaHei"', // Windows 上等宽字体默认的“宋体”斜着看起来太难受了
        'monospace',
    ].join(','),
    // scrollPastEnd: 1,
};

ace.config.setModuleUrl('ace/mode/markdown', aceModeMarkdown);
ace.config.setModuleUrl('ace/theme/xcode', aceThemeXcode);

/** 封装自用的 ace 编辑器 */
class AceEditor {
    constructor() {
        this.editor = null;
        this.storage = null;
    }

    /**
     * 初始化编辑器
     *
     * @param {string} selectors css 选择符
     * @param {object} 配置项
     */
    init(selectors, { content, useCache, cacheKey }) {
        this.editor = ace.edit(selectors, ACE_CONFIGS);
        // eslint-disable-next-line no-use-before-define
        this.storage = new AceEditorStorage(cacheKey);

        let cacheContent = content;

        // 指明使用缓存初始化
        if (useCache) {
            const cachedData = this.storage.getValues();

            cacheContent = cachedData.content || content;
            // 无内容，不渲染
            if (!cacheContent) return;
        }

        // 分离式 change 监听器导致需要延后更新视图
        // 置于 event loop 中
        setTimeout(() => {
            this.editor.setValue(cacheContent);
            this.editor.clearSelection(); // 清除选中
        });
    }

    addChangeListener(listener) {
        const { editor, storage } = this;

        editor.on('change', debounce(() => {
            const content = editor.getValue();
            const html = marked(content);

            storage.setValues({ content, html });
            // 通知 react 渲染；注入 cbRenderer
            listener(html, (prevHtml) => {
                // 渲染完成后的回调，进行 mermaid 与 mathjax 渲染
                renderMermaid({ html, prevHtml });
                renderMathJax();
            });
        }, 800));
    }

    resize() {
        if (!this.editor) {
            return;
        }
        this.editor.resize();
    }
}

export const ACE_STORAGE_DRAFT = 'cache_draft'; // 新建
export const ACE_STORAGE_ARTICLE = 'cache_article'; // 编辑
export const ACE_STORAGE_LOCAL = 'cache_local'; // 本地草稿

/** 配套 ace 编辑器的存储实现 */
export class AceEditorStorage {
    constructor(key) {
        this.key = key;
        this.keyHtml = `${key}_html`;
    }

    /**
     * 读取编辑器数据
     *
     * @returns {object}
     */
    getValues() {
        const content = localStorage.getItem(this.key) || '';
        const html = localStorage.getItem(this.keyHtml) || '';

        return { content, html };
    }

    /**
     * 设置编辑器数据（无参数可清空）
     *
     * @param {object} data
     */
    setValues(data = {}) {
        const { content = '', html = '' } = data;

        localStorage.setItem(this.key, content);
        localStorage.setItem(this.keyHtml, html);
    }
}

export default new AceEditor();
