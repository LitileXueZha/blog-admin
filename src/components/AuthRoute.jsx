import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Msg from './message';

function AuthRoute(props) {
    const { history, location, children, token } = props;
    const { pathname } = location;

    // 校验 token 是否存在
    // if (pathname !== '/login' && !localStorage.getItem(TOKEN_NAME)) {
    //     Msg.info('未登录');
    //     try {

    //     } catch (e) {}
    //     history.push('/login', { from: location });
    //     return null;
    // }

    useEffect(() => {
        if (pathname !== '/login' && !token) {
            // FIXME: 为什么会报错？
            // Msg.info('未登录');
            history.push('/login', { from: location });
        }
    }, [pathname, location, token]);

    return children;
}

function mapStateToProps(store) {
    return {
        token: store.global.token,
    };
}

export default withRouter(connect(mapStateToProps)(AuthRoute));
