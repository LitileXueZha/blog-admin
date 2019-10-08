import QueryString from 'query-string';

import { API } from './constants';

export default function fetch(url, opts = {}) {
    let apiUrl = API + url;

    if (opts.params) {
        // GET 请求的查询参数，不能放到 body
        apiUrl += `?${QueryString.stringify(opts.params)}`;
    }

    return new Promise((resolve, reject) => {
        window
            .fetch(apiUrl, opts)
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
