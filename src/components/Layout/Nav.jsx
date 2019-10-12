import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';

function Nav(props) {
    function getActiveName(path) {
        let className = 'header-nav-item';
        const { pathname } = props.location;

        if (pathname.indexOf(path) === 0) {
            className += ' active';
        }

        return className;
    }

    return (
        <nav className="header-nav">
            <ButtonBase className={getActiveName('/article')} component="div">
                <Link to="/article">
                    <ion-icon name="ios-book" />
                    文章
                </Link>
            </ButtonBase>
            <ButtonBase className={getActiveName('/tag')} component="div">
                <Link to="/tag">
                    <ion-icon name="ios-pricetags" />
                    标签云
                </Link>
            </ButtonBase>
            <ButtonBase className={getActiveName('/msg')} component="div">
                <Link to="/msg">
                    <ion-icon name="ios-easel" />
                    留言板
                </Link>
            </ButtonBase>
            <ButtonBase className={getActiveName('/comment')} component="div">
                <Link to="/comment">
                    <ion-icon name="ios-text" />
                    评论管理
                </Link>
            </ButtonBase>
        </nav>
    );
}

export default withRouter(Nav);
