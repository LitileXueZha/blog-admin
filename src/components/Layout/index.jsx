import React from 'react';
import { Container } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import './index.less';

function Layout(props) {
    return (
        <React.Fragment>
            <header className="header">
                <Container className="header-content">
                    <img src={require('@assets/images/logo.jpg')} className="logo" alt="logo" width="50" height="50" />

                    
                </Container>
            </header>

            <Container>{props.children}</Container>

            <footer className="footer">All rights reserved by Mr. tao</footer>
        </React.Fragment>
    );
}

export default withRouter(Layout);
