import React, { useState } from 'react';
import {
    Container,
    Menu,
    MenuItem,
    IconButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.less';
import Nav from './Nav';
import BreadCrumb from './BreadCrumb';
import { logout } from '../../store/global';

function Layout(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user } = props;

    console.log(props);

    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <header className="header">
                <Container className="header-content">
                    <Link to="/">
                        <img src={require('@assets/images/logo.jpg')} className="logo" alt="logo" width="50" height="50" />
                    </Link>
                    {/* <Link to="/" className="logo">博客管理系统</Link> */}

                    <Nav />

                    <IconButton className="menu" onClick={(e) => setAnchorEl(e.target)}>
                        <ion-icon name="ios-person" />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem>诸葛林</MenuItem>
                        <MenuItem>
                            <Link to="/login">登出</Link>
                        </MenuItem>
                    </Menu>
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

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

function mapStateToProps(store) {
    return {
        user: store.global.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
