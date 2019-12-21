import React from 'react';
import Loadable from 'react-loadable';

/**
 * 加载中组件
 * 
 * `react-loadable` 强制要求有个加载中的组件，醉了。
 * 不过使用起来也挺不错的，以后加点花样
 */
function Loading() {
    return (
        <span>loading...</span>
    );
}

/**
 * 懒加载
 * 
 * 简单地封装 `Loadable`，不用写重复代码
 * 
 * @param {Function} loader 动态 `import` 方法
 * @return {Component} 返回 `Loadable()` 的组件
 */
export default function lazyload(loader) {
    return Loadable({
        loader,
        loading: Loading,
    });
}
