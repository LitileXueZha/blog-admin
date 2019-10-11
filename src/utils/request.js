import QueryString from 'query-string';

import { API } from './constants';

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
        apiUrl += `?${QueryString.stringify(opts.params)}`;
    }
    if (opts.body) {
        // 发送数据必须手动转成 json 字符串
        opts.body = JSON.stringify(opts.body);
    }

    const options = {
        ...defaultOpts,
        ...opts,
        headers: {
            ...defaultOpts.headers,
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
                } else {
                    reject(res);
                }
            });
    });
}
