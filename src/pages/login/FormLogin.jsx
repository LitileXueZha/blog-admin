import React from 'react';
import PropTypes from 'prop-types';
import {
    Paper,
    TextField,
    Button,
} from '@material-ui/core';

import useValidate from './useValidate';

const RULE = {
    account: {
        validator: (text) => text.trim(),
        errorMsg: '请输入账号',
    },
    pwd: {
        validator: (text) => text.trim(),
        errorMsg: '请输入密码',
    },
};

export default function FormLogin(props) {
    const [validateRes, setValidateRes] = useValidate(RULE);
    const { account, pwd } = validateRes;

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            account: e.target.account.value.trim(),
            pwd: e.target.pwd.value.trim(),
        };

        if (!(setValidateRes(data))) return;

        props.onSubmit(data);
    };

    return (
        <Paper component="form" className="form-login" onSubmit={onSubmit}>
            <TextField
                label="账号"
                name="account"
                onChange={(e) => setValidateRes({ account: e.target.value })}
                fullWidth
                error={account.error}
                helperText={account.helperText || ' '}
            />
            <TextField
                type="password"
                label="密码"
                name="pwd"
                onChange={(e) => setValidateRes({ pwd: e.target.value })}
                fullWidth
                error={pwd.error}
                helperText={pwd.helperText || ' '}
            />

            <Button type="submit" color="primary" variant="contained" style={{ marginTop: 30 }} fullWidth>登录</Button>
        </Paper>
    );
}

FormLogin.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
