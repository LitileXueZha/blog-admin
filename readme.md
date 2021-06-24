# blog-admin

管理自己博客的后台系统，使用的技术栈：

+ 技术栈：[react](https://reactjs.org/docs/react-component.html)
+ UI：[material-ui](https://material-ui.com/demos/bottom-navigation/)
+ 构建工具：[webpack](https://www.webpackjs.com/concepts/)

## 图标 SVG 嵌入式方案

主要基于 ionicons，但是因为其是动态加载，导致页面或组件闪烁，遂思考如何像 Github 那样直接把 svg 嵌入到 html 中直接渲染。[参考](https://github.blog/2016-02-22-delivering-octicons-with-svg/)

Antd 的方案是自己实现了一套 Icon 组件，库里包含了各种 .svg 图标，并将其转成了 jsx 语法结构，因而可直接 `import` 使用。如果需要自定义图标，其推荐做法是使用 `@svgr/webpack` loader + `svgo` 压缩。

想法是**直接嵌入到 html 中**。利用 `dangerousSetInnerHTML` 属性可以嵌入 html 片段，但是会多增一个包裹标签，看样子只能用脚本生成了。

使用前先在 `public/SVGIcons.json` 中添加需要的图标名称，然后运行构建任务 `npm run icons` 生成。线上打包时也需要运行一次构建任务。

```javascript
// 生成的入口文件在
// src/assets/icons/index.js
import { IconName } from './assets/icons';
```
