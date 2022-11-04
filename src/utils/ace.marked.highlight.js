import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
import markdown from 'highlight.js/lib/languages/markdown';
import nginx from 'highlight.js/lib/languages/nginx';
import http from 'highlight.js/lib/languages/http';
import php from 'highlight.js/lib/languages/php';
import sql from 'highlight.js/lib/languages/sql';
import diff from 'highlight.js/lib/languages/diff';
import shell from 'highlight.js/lib/languages/shell';
import yaml from 'highlight.js/lib/languages/yaml';

import 'highlight.js/styles/atom-one-light.css';

// 注册语法
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('http', http);
hljs.registerLanguage('php', php);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('diff', diff);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('yaml', yaml);

/**
 * 已高亮的语言（按字母排序）
 *
 * bash css diff html http javascript
 * markdown nginx php shell sql
 */
export default hljs;
