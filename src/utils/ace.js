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

ace.init = (selector) => {
    const editor = ace.edit(selector, {
        mode: 'ace/mode/markdown',
        theme: 'ace/theme/xcode',
        maxLines: 1000,
        printMarginColumn: 120,
        wrap: true,
    });


    return editor;
};
ace.config.setModuleUrl('ace/mode/markdown', aceModeMarkdown);
ace.config.setModuleUrl('ace/theme/xcode', aceThemeXcode);

export default ace;
