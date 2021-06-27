/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */

/**
 * 防抖
 * 
 * @param {function} fn
 * @param {number} duration 间隔时间
 * @returns {function}
 */
export function debounce(fn, duration = 400) {
    let timer;

    return function fns_debounce() {
        clearTimeout(timer);
        timer = setTimeout(fn, duration);
    };
}
