import React from 'react';
import { Paper, Collapse } from '@material-ui/core';
import { connect } from 'react-redux';

import imgLogo from '@assets/images/logo.jpg';
import './index.less';
import animate from '../../utils/animate.js';
import FormLogin from './FormLogin.jsx';
import { login } from '../../store/global.js';
import Msg from '../../components/message.js';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginError: false,
        };
        document.title = '登录滔\'s 博客';
    }

    handleSubmit = (data) => {
        this.props.login(data)
            .then(() => {
                const { location, history } = this.props;
                // 未登录时路由回跳
                const { from } = location.state || { from: { pathname: '/' } };

                Msg.success('登录成功');
                history.push(from);
            })
            .catch(() => {
                if (this.state.loginError) {
                    // 动画效果
                    animate('.animate', 'shake');
                }

                this.setState({ loginError: true });
            });
    };

    render() {
        const { loginError } = this.state;

        return (
            <div className="container-login">
                <div className="login-header">
                    <a href="https://www.ningtaostudy.cn" target="_blank" rel="noopener noreferrer">
                        <img src={imgLogo} className="login-logo" alt="logo" width="50" height="50" />
                    </a>
                    <h1 className="login-title">登录滔&apos;s 博客</h1>
                </div>
                <Collapse in={loginError} className="animate">
                    <Paper className="login-error">
                        用户名或密码错误
                    </Paper>
                </Collapse>

                <FormLogin onSubmit={this.handleSubmit} />

                <footer className="footer">All rights reserved by Mr. tao</footer>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (data) => dispatch(login(data)),
    };
}

export default connect(null, mapDispatchToProps)(Login);
