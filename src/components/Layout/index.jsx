import React from 'react';
import { Container, ButtonBase, Breadcrumbs } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';

import './index.less';
import Nav from './Nav';
import BreadCrumb from './BreadCrumb';

function Layout(props) {
    return (
        <>
            <header className="header">
                <Container className="header-content">
                    <img src={require('@assets/images/logo.jpg')} className="logo" alt="logo" width="50" height="50" />

                    <Nav />
                </Container>
            </header>

            <Container component="main">
                <BreadCrumb />

                {props.children}
            </Container>

            <footer className="footer">All rights reserved by Mr. tao</footer>
        </>
    );
}

export default withRouter(Layout);
