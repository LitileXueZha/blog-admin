let mermaid;
let MathJax;
// let $mathjax;
const regMermaid = /<div class="mermaid">[\s\S]+?<\/div>/gm;

/**
 * 使用 mermaid.js 渲染流程图
 *
 * @param {Object} data 渲染数据
 */
export function renderMermaid({ html, prevHtml }) {
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

export function renderMathJax() {
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
