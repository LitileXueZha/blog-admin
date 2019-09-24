import React from 'react';
import { Container, ButtonBase, Breadcrumbs } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';

import './index.less';
import Nav from './Nav';

const BREADCRUMB = {
    '/article': '文章',
    '/article/edit': <><ion-icon name="ios-brush" /> 写文章</>,
    '/tag': '标签',
    '/msg': '留言',
    '/comment': '评论',
};

function Layout(props) {
    const renderBreadcrumb = () => {
        const paths = props.location.pathname.split('/').filter((x) => x);
        let to = '';

        return paths.map((path, index) => {
            to += `/${path}`;

            if (index === paths.length - 1) {
                return <span className="breadcrumb-item active">{BREADCRUMB[to]}</span>;
            }

            return <Link to={to} className="breadcrumb-item">{BREADCRUMB[to]}</Link>;
        });
    };

    return (
        <>
            <header className="header">
                <Container className="header-content">
                    <img src={require('@assets/images/logo.jpg')} className="logo" alt="logo" width="50" height="50" />

                    <Nav />
                </Container>
            </header>

            <Container component="main">
                <Breadcrumbs className="breadcrumb">
                    {renderBreadcrumb()}
                </Breadcrumbs>

                {props.children}
            </Container>

            <footer className="footer">All rights reserved by Mr. tao</footer>
        </>
    );
}

export default withRouter(Layout);
