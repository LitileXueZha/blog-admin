import React from 'react';
import { TextField, Paper, Button, Collapse } from '@material-ui/core';

import './index.less';
import animate from '../../utils/animate';

const RULE = {
    user: {
        validator: (text) => text.trim(),
        errorMsg: '请输入账号',
    },
    pwd: {
        validator: (text) => text.trim(),
        errorMsg: '请输入密码',
    },
};

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formControl: {
                user: {},
                pwd: {},
            },
            loginError: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const user = e.target.user.value.trim();
        const pwd = e.target.pwd.value.trim();

        if (!(this.validate({ user, pwd }))) return;

        if (user === 'tao' && pwd === 'tao') {
            this.props.history.push('/');
            return;
        }

        if (this.state.loginError) {
            // 动画效果
            animate('.animate', 'shake');
        }

        this.setState({ loginError: true });
    };

    validate(values) {
        const fields = Object.keys(values);
        const { formControl } = this.state;
        let success = true;

        fields.forEach((key) => {
            const { validator, errorMsg } = RULE[key];
            let err = {};

            if (!validator(values[key])) {
                err = {
                    error: true,
                    helperText: errorMsg,
                };
                success = false;
            }

            formControl[key] = err;
        });

        this.setState({ formControl });
        return success;
    }

    render() {
        const { formControl: { user, pwd }, loginError } = this.state;

        return (
            <div className="container-login">
                <div className="login-header">
                    <a href="https://www.ningtaostudy.cn" target="_blank" rel="noopener noreferrer">
                        <img src={require('@assets/images/logo.jpg')} className="login-logo" alt="logo" width="50" height="50" />
                    </a>
                    <h1 className="login-title">登录滔&apos;s 博客</h1>
                </div>
                <Collapse in={loginError} className="animate">
                    <Paper className="login-error">
                        用户名或密码错误
                    </Paper>
                </Collapse>
                <Paper component="form" className="form-login" onSubmit={this.handleSubmit}>
                    <TextField
                        label="账号"
                        name="user"
                        onChange={(e) => this.validate({ user: e.target.value })}
                        fullWidth
                        error={user.error}
                        helperText={user.helperText || ' '}
                    />
                    <TextField
                        type="password"
                        label="密码"
                        name="pwd"
                        onChange={(e) => this.validate({ pwd: e.target.value })}
                        fullWidth
                        error={pwd.error}
                        helperText={pwd.helperText || ' '}
                    />

                    <Button type="submit" color="primary" variant="contained" style={{ marginTop: 30 }} fullWidth>登录</Button>
                </Paper>

                <footer className="footer">All rights reserved by Mr. tao</footer>
            </div>
        );
    }
}

export default Login;
