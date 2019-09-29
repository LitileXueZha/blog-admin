/**
 * 使用 animate.css
 *
 * @example `animate('.clsss', 'shake')`
 * @see https://daneden.github.io/animate.css
 *
 * @param {String} selector css 选择符
 * @param {String} animationName 动画名称
 */
export default function animateCss(selector, animationName) {
    const node = document.querySelector(selector);
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName);
        node.removeEventListener('animationend', handleAnimationEnd);
    }

    node.addEventListener('animationend', handleAnimationEnd);
}
