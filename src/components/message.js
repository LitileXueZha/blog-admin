import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Snackbar, Slide, SnackbarContent } from '@material-ui/core';

const ICON = {
    info: {
        color: '#448aff',
        name: 'ios-information-circle',
    },
    success: {
        color: '#009688',
        name: 'ios-checkmark-circle',
    },
    warn: {
        color: '#ffbf00',
        name: 'ios-alert',
    },
    error: {
        color: '#f44336',
        name: 'ios-close-circle',
    },
};

function Message() {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('info');
    const [message, setMessage] = useState('');

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
            autoHideDuration={2000}
            onClose={handleClose}
            TransitionComponent={Slide}
        >
            <SnackbarContent
                style={{ background: '#fff', color: '#333', minWidth: 'auto', padding: '3px 16px' }}
                message={
                    (
                        <div style={{ display: 'flex', alignItems: 'center', color: '#666' }}>
                            <ion-icon name={ICON[type].name} style={{ fontSize: '18px', marginRight: 5, color: ICON[type].color }} />
                            {message}
                        </div>
                    )
                }
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

/**
 * 全局提示组件
 *
 * 使用时 `Msg.info('some message')`，总共四种：`info、success、error、warn`
 */
export default Msg;
