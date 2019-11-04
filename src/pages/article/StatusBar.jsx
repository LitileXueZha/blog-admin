import React, { useState, useRef } from 'react';
import {
    Button,
    Menu,
    MenuItem,
} from '@material-ui/core';

const PREVIEW_OPT = {
    input: '仅输入',
    view: '仅预览',
    'input&view': '输入和预览',
};

export default function StatusBar(props) {
    const previewRef = useRef(null);
    const [status, setStatus] = useState('input&view');
    const [open, setOpen] = useState(false);

    const handlePreviewClick = (previewStatus) => {
        setStatus(previewStatus);
        setOpen(false);
        props.onChange({
            event: 'preview',
            status: previewStatus,
        });
    };
    const handleClick = (event) => {
        props.onChange({ event });
    };

    return (
        <div className="actions">
            <img
                src={require('@assets/images/ace.png')}
                className="editor-logo"
                alt="ace"
                title="powered by ace-editor"
                height="24"
            />
            <Button onClick={() => setOpen(true)} ref={previewRef}>
                <ion-icon style={{ marginRight: 5 }} name="ios-apps" />
                {PREVIEW_OPT[status]}
            </Button>
            <Menu anchorEl={previewRef.current} open={open} onClose={() => setOpen(false)}>
                {Object.entries(PREVIEW_OPT).map(([key, value]) => (
                    <MenuItem key={key} onClick={() => handlePreviewClick(key)}>{value}</MenuItem>
                ))}
            </Menu>
            <Button onClick={() => handleClick('input')}>
                <ion-icon style={{ marginRight: 5 }} name="expand" />
                {props.fullscreen ? '取消全屏' : '全屏输入'}
            </Button>
            <Button onClick={() => handleClick('look')}>
                <ion-icon style={{ marginRight: 5 }} name="ios-eye" />
                F11 预览
            </Button>
            <Button
                onClick={() => handleClick('next')}
                style={{ float: 'right' }}
                color="primary"
                variant="contained"
            >
                写完了
            </Button>
            {props.showSave
                && (
                    <Button onClick={() => handleClick('save')} style={{ float: 'right', marginRight: 10 }}>
                        直接保存
                    </Button>
                )}
        </div>
    );
}
