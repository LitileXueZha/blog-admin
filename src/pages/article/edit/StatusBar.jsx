import React, { useState, useRef } from 'react';
import {
    Button,
    Menu,
    MenuItem,
} from '@material-ui/core';

import imgAce from '@assets/images/ace.png';
import { IosApps, MdExpand, IosEye } from '../../../assets/icons';

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
                src={imgAce}
                className="editor-logo"
                alt="ace"
                title="powered by ace-editor"
                width="36"
                height="24"
            />
            <Button onClick={() => setOpen(true)} ref={previewRef}>
                <IosApps style={{ marginRight: 5 }} />
                {PREVIEW_OPT[status]}
            </Button>
            <Menu anchorEl={previewRef.current} open={open} onClose={() => setOpen(false)}>
                {Object.entries(PREVIEW_OPT).map(([key, value]) => (
                    <MenuItem
                        key={key}
                        selected={key === status}
                        onClick={() => handlePreviewClick(key)}
                    >
                        {value}
                    </MenuItem>
                ))}
            </Menu>
            <Button onClick={() => handleClick('input')}>
                <MdExpand style={{ marginRight: 5 }} />
                {props.fullscreen ? '取消全屏' : '全屏输入'}
            </Button>
            <Button onClick={() => handleClick('look')}>
                <IosEye style={{ marginRight: 5 }} />
                F11 预览
            </Button>
            <Button
                onClick={() => handleClick('next')}
                style={{ float: 'right' }}
                color="primary"
                variant="contained"
                disabled={props.disableNext}
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
