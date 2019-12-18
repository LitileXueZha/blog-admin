import fetch from '../utils/request';
import { TOKEN_NAME } from '../utils/constants';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const LOGOUT_OF_EXPIRE = 'LOGOUT_OF_EXPIRE';
const initialState = {
    // 默认从 localStorage 取
    token: localStorage.getItem(TOKEN_NAME) || '',
    // 当前登录用户
    user: {},
};

export function login(body) {
    return (dispatch) => fetch('/user/login', {
        method: 'POST',
        body,
        hideErrorToast: true,
    }).then((res) => {
        // 缓存鉴权 token
        localStorage.setItem(TOKEN_NAME, res.token);
        dispatch({
            type: LOGIN,
            payload: res,
        });
    });
}

/**
 * 登出。情况有两种：
 * 1. 主动登出
 * 2. token 过期，被动登出
 *
 * @param {Boolean} isExpired 是否为过期后登出
 */
export function logout(isExpired = false) {
    // 清除缓存 token
    localStorage.removeItem(TOKEN_NAME);
    return {
        type: isExpired ? LOGOUT_OF_EXPIRE : LOGOUT,
    };
}

export default function global(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, ...action.payload };
        case LOGOUT:
        case LOGOUT_OF_EXPIRE:
            return { ...state, token: '' };
        default:
            return state;
    }
}
