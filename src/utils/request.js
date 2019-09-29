import { API } from './constants';

export default function fetch(url, opts) {
    return new Promise((resolve, reject) => {
        window
            .fetch(API + url, opts)
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
