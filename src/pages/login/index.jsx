import React from 'react';
import { TextField, Paper, Button } from '@material-ui/core';

import './index.less';

class Login extends React.Component {
    state = {};

    handleSubmit = (e) => {
        e.preventDefault();

        const user = e.target.user.value.trim();
        const pwd = e.target.pwd.value.trim();

        if (user === 'tao' && pwd === 'tao') {
            this.props.history.push('/');
        }
    };

    render() {
        return (
            <div className="container-login">
                <div className="login-header">
                    <img src={require('@assets/images/logo.jpg')} className="login-logo" alt="logo" width="50" height="50" />
                    <h1 className="login-title">{'登录滔\'s 博客'}</h1>
                </div>
                <Paper component="form" className="form-login" onSubmit={this.handleSubmit}>
                    <TextField label="用户名" name="user" fullWidth />
                    <TextField type="password" style={{ marginTop: 20 }} label="密码" name="pwd" fullWidth />

                    <Button type="submit" className="btn-submit" style={{ marginTop: 40 }} fullWidth>登录</Button>
                </Paper>

                <footer className="footer">All rights reserved by Mr. tao</footer>
            </div>
        );
    }
}

export default Login;
