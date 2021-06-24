import React, { useState, useEffect } from 'react';
import {
    Container,
    Menu,
    MenuItem,
    IconButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import imgLogo from '@assets/images/logo.jpg';
import './index.less';
import Nav from './Nav';
import BreadCrumb from './BreadCrumb';
import { logout, whoami } from '../../store/global';
import { IosPerson } from '../../assets/icons';

function Layout(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const { global: { user, token } } = props;

    const handleClose = () => setAnchorEl(null);

    useEffect(() => {
        // 无用户信息查询之
        if (token && !user.id) {
            props.whoami();
        }
    }, []);

    return (
        <>
            <header className="header">
                <Container className="header-content">
                    <Link to="/" style={{ lineHeight: 0 }}>
                        <img src={imgLogo} className="logo" alt="logo" width="50" height="50" />
                    </Link>
                    {/* <Link to="/" className="logo">博客管理系统</Link> */}

                    <Nav />

                    <IconButton className="menu" onClick={(e) => setAnchorEl(e.target)}>
                        <IosPerson />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem>{user.display_name || 'Admin'}</MenuItem>
                        <MenuItem style={{ color: '#448aff' }} onClick={props.logout}>
                            注销
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
        global: store.global,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
        whoami: () => dispatch(whoami()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
