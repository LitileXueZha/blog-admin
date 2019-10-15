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

ace.init = (selector, ele) => {
    const editor = ace.edit(selector, {
        mode: 'ace/mode/markdown',
        theme: 'ace/theme/xcode',
        maxLines: 1000,
        printMarginColumn: 120,
        wrap: true,
        foldStyle: 'markbegin',
    });
    let timer = null;

    // md 转 html
    editor.on('change', () => {
        clearTimeout(timer);

        // 简易防抖
        timer = setTimeout(() => {
            const content = editor.getValue();
            const html = marked(content);

            ele.innerHTML = html;
            console.log(html);
        }, 800);
    });

    return editor;
};
ace.config.setModuleUrl('ace/mode/markdown', aceModeMarkdown);
ace.config.setModuleUrl('ace/theme/xcode', aceThemeXcode);
ace.listen = (editor, ele) => {
    editor.on('change', () => {
        console.log(arguments);
    });
};

export default ace;
