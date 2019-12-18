import QueryString from 'query-string';

import { API, API_OMIT } from './constants';
import Msg from '../components/message';
// import store from '../store';

/**
 * 请求默认值
 *
 * @var {Object}
 */
const defaultOpts = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    // credentials: 'include',
};

/**
 * redux 的存储对象
 *
 * @var {Object}
 */
let ReduxStore;
let ReduxStoreAction;

/**
 * 请求封装
 *
 * 简易封装版 `fetch`，支撑业务逻辑。
 * 自定义配置有：
 *
 * + `params` 请求方式为 `'GET'` 时的参数
 * + `hideErrorToast` 隐藏业务逻辑失败时的默认错误提示
 *
 * @param {String} url 接口 url
 * @param {Options} opts 标准 `fetch` 中的配置 + 自定义配置
 */
export default function fetch(url, opts = {}) {
    let apiUrl = API + url;

    if (opts.params) {
        // GET 请求的查询参数，不能放到 body
        apiUrl += '?';
        // php 获取 GET 请求的数组形式只支持 `xxx[]=&xxx[]=` 形式
        apiUrl += QueryString.stringify(opts.params, {
            arrayFormat: 'bracket',
        });
    }
    if (opts.body) {
        // 发送数据必须手动转成 json 字符串
        opts.body = JSON.stringify(opts.body);
    }

    // 从 store 中拿 token
    const { global: { token } } = ReduxStore.getState();

    // // 无 token 不发请求
    if (!token && API_OMIT.indexOf(url) < 0) {
        return Promise.reject('未认证');
    }

    const options = {
        ...defaultOpts,
        ...opts,
        headers: {
            ...defaultOpts.headers,
            // 带上 token。这里逻辑很简单，只负责发请求
            Authorization: token,
            ...opts.headers,
        },
    };

    return new Promise((resolve, reject) => {
        window
            .fetch(apiUrl, options)
            .then((res) => res.json())
            .then((res) => {
                const { code, data } = res;

                if (code === 1) {
                    resolve(data);
                } else if (code === 9001) {
                    ReduxStore.dispatch(ReduxStoreAction.logout(true));
                    Msg.info('登录失效，请重新登录');
                    reject(res);
                } else {
                    reject(res);
                    if (!opts.hideErrorToast) {
                        Msg.error(res.error);
                    }
                }
            })
            .catch((e) => {
                console.warn(e);
                Msg.info('网络开小差了~');
            });
    });
}

export const setFetchStore = (store, actionCreators) => {
    ReduxStore = {
        getState: store.getState,
        dispatch: store.dispatch,
    };
    ReduxStoreAction = actionCreators;
};
