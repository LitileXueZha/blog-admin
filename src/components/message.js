import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Snackbar, Slide, SnackbarContent as MuiSnackbarContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import {
    IosInformationCircle,
    IosCheckmarkCircle,
    IosAlert,
    IosCloseCircle,
} from '../assets/icons';

const ICON = {
    info: {
        color: '#448aff',
        name: 'ios-information-circle',
        component: IosInformationCircle,
    },
    success: {
        color: '#009688',
        name: 'ios-checkmark-circle',
        component: IosCheckmarkCircle,
    },
    warn: {
        color: '#ffbf00',
        name: 'ios-alert',
        component: IosAlert,
    },
    error: {
        color: '#f44336',
        name: 'ios-close-circle',
        component: IosCloseCircle,
    },
};
const SnackbarContent = withStyles({
    root: {
        minWidth: 'auto',
        padding: '2px 16px',
        color: '#333',
        lineHeight: '16px',
        background: '#fff',
    },
})(MuiSnackbarContent);

function Message() {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('info');
    const [message, setMessage] = useState('');

    const Icon = ICON[type].component;
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    Message.open = (msgType, content) => {
        setOpen(true);
        setType(msgType);
        setMessage(content);
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            TransitionComponent={Slide}
        >
            <SnackbarContent
                message={(
                    <>
                        <Icon style={{ fontSize: '18px', marginRight: 5, color: ICON[type].color }} />
                        {message}
                    </>
                )}
            />
        </Snackbar>
    );
}

const Msg = {
    target: null,

    init() {
        const target = document.createElement('div');

        target.id = 'msg-snackbar';
        target.style.position = 'absolute';
        document.body.appendChild(target);
        ReactDOM.render(<Message />, target);
        this.target = target;
    },

    open({ content, type }) {
        if (!this.target) {
            this.init();
        }

        Message.open(type, content);
    },
};

['info', 'success', 'error', 'warn'].forEach((type) => {
    Msg[type] = (content) => {
        Msg.open({ content, type });
    };
});
// window.Msg = Msg;

/**
 * 全局提示组件
 *
 * 使用时 `Msg.info('some message')`，总共四种：`info、success、error、warn`
 */
export default Msg;
