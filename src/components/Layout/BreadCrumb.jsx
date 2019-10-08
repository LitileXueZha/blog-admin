import React from 'react';
import { Breadcrumbs } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';

/**
 * 面包屑导航配置
 *
 * @var {Object}
 */
const BREADCRUMB = {
    '/': '首页',
    '/article': '文章',
    '/article/edit': {
        title: '写文章',
        icon: 'brush',
    },
    '/tag': '标签',
    '/msg': '留言',
    '/comment': '评论',
};


function BreadCrumb(props) {
    const paths = props.location.pathname.split('/');
    let to = '';
    const crumbs = [];

    for (let i = 1; i < paths.length; i ++) {
        to += `/${paths[i]}`;

        const bread = BREADCRUMB[to];
        let title = bread;
        let icon;
        let crumb = '';

        if (typeof bread === 'object') {
            title = bread.title;
            icon = <ion-icon name={`ios-${bread.icon}`} />;
        }

        // NOTE: 设置浏览器标题
        document.title = title;

        if (i === paths.length - 1) {
            // 最后一个
            crumb = (
                <span className="breadcrumb-item active">
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

export default withRouter(BreadCrumb);
