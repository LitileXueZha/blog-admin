import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';

import {
    IosBook,
    IosPricetags,
    IosEasel,
    IosText,
} from '../../assets/icons';

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
            <ButtonBase className={getActiveName('/article')} component={Link} to="/article" focusRipple>
                <IosBook className="icon" />
                文章
            </ButtonBase>
            <ButtonBase className={getActiveName('/tag')} component={Link} to="/tag" focusRipple>
                <IosPricetags className="icon" />
                标签云
            </ButtonBase>
            <ButtonBase className={getActiveName('/msg')} component={Link} to="/msg" focusRipple>
                <IosEasel className="icon" />
                留言板
            </ButtonBase>
            <ButtonBase className={getActiveName('/comment')} component={Link} to="/comment" focusRipple>
                <IosText className="icon" />
                评论管理
            </ButtonBase>
        </nav>
    );
}

export default withRouter(Nav);
