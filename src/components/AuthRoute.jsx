import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { TOKEN_NAME } from '../utils/constants';
import Msg from './message';

function AuthRoute(props) {
    const { history, location, children } = props;
    const { pathname } = location;

    // 校验 token 是否存在
    // if (pathname !== '/login' && !localStorage.getItem(TOKEN_NAME)) {
    //     console.count()
    //     Msg.info('未登录');
    //     try {

    //     } catch (e) {}
    //     history.push('/login', { from: location });
    //     return null;
    // }

    useEffect(() => {
        if (pathname !== '/login' && !localStorage.getItem(TOKEN_NAME)) {
            // FIXME: 为什么会报错？
            // Msg.info('未登录');
            history.push('/login', { from: location });
        }
    }, [pathname, location]);

    return children;
}

export default withRouter(AuthRoute);
