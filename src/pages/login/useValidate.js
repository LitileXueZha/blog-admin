import { useState } from 'react';

/**
 * 自定义表单校验 hooks
 *
 * @param {Object} rules 校验规则
 * @param {Object} initialState 初始校验结果。默认为校验规则每个 key 空对象
 */
export default function useValidate(rules, initialState = null) {
    const defaultState = getDefaultState(initialState, rules);
    const [res, setRes] = useState(defaultState);

    const validate = (data) => {
        const fields = Object.keys(data);
        const result = {};
        let success = true;

        fields.forEach((key) => {
            const { validator, errorMsg } = rules[key];
            let err = {};

            if (!validator(data[key])) {
                err = {
                    error: true,
                    helperText: errorMsg,
                };
                success = false;
            }

            result[key] = err;
        });

        setRes({ ...res, ...result });
        return success;
    };

    return [res, validate];
}

function getDefaultState(initialState, rules) {
    if (initialState) {
        return initialState;
    }

    const defaultState = {};

    // 默认为校验规则每个 key 空对象
    Object.keys(rules).forEach((key) => {
        defaultState[key] = {};
    });

    return defaultState;
}
