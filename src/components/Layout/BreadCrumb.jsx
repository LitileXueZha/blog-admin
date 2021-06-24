import React from 'react';
import { Breadcrumbs } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';

import { IosBrush } from '../../assets/icons';

/**
 * 面包屑导航配置
 *
 * @var {Object}
 */
const BREADCRUMB = {
    '/': '首页',
    '/article': '文章',
    '/article/trash': '垃圾箱',
    '/article/draft': '草稿',
    '/article/new': {
        title: '写文章',
        icon: <IosBrush />,
    },
    '/article/_/*': '文章详情',
    '/tag': '标签',
    '/msg': '留言',
    '/comment': '评论',
    404: '页面不见了',
};
// 项目代号
const TITLE_SUFFIX = 'YesFamily';


function BreadCrumb(props) {
    const paths = props.location.pathname.split('/');
    let to = '';
    let crumbs = [];

    for (let i = 1; i < paths.length; i ++) {
        const exactTo = `${to}/${paths[i]}`;
        // 通配符匹配
        const wildcard = `${to}/*`;

        // 下划线路径忽略
        if (paths[i] === '_') {
            to += '/_';
            continue;
        }
        if (exactTo in BREADCRUMB) {
            to = exactTo;
        } else if (wildcard in BREADCRUMB) {
            to = wildcard;
        } else {
            // 404 界面
            to = 404;
            document.title = BREADCRUMB[to];
            crumbs = <span className="breadcrumb-item active">{BREADCRUMB[to]}</span>;
            break;
        }

        const bread = BREADCRUMB[to];
        let title = bread;
        let icon;
        let crumb = '';

        if (typeof bread === 'object') {
            title = bread.title;
            icon = bread.icon;
        }

        // NOTE: 设置浏览器标题
        document.title = `${title}_${TITLE_SUFFIX}`;

        if (i === paths.length - 1) {
            // 最后一个
            crumb = (
                <span className="breadcrumb-item active" key="last">
                    {icon}
                    {title}
                </span>
            );
        } else {
            crumb = (
                <Link to={to} className="breadcrumb-item" key={to}>
                    {icon}
                    {title}
                </Link>
            );
        }

        crumbs.push(crumb);
    }

    return (
        <Breadcrumbs className="breadcrumb">
            {crumbs}
        </Breadcrumbs>
    );
}

export default withRouter(React.memo(BreadCrumb));
