import QueryString from 'query-string';

import { API, TOKEN_NAME } from './constants';
import Msg from '../components/message';

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

    const token = localStorage.getItem(TOKEN_NAME);

    // 无 token 不发请求
    if (!token) {
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
                    // TODO: token 过期
                } else {
                    reject(res);
                    Msg.error(res.error);
                }
            })
            .catch((e) => {
                console.warn(e);
                Msg.info('网络开小差了~');
            });
    });
}
