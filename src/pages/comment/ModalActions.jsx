import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@material-ui/core';

export function ActionReply(props) {
    const { open, item, onCancel, onConfirm } = props;
    const [error, setError] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();

        const content = e.target.content.value.trim();

        if (error || !content) {
            setError(true);
            return;
        }

        onConfirm({ content });
    };

    return (
        <Dialog
            key="reply"
            open={open}
            PaperProps={{ component: 'form', onSubmit }}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>
                回复『
                {` ${item.name || item.extName} `}
                』
            </DialogTitle>
            <DialogContent>
                <TextField
                    name="content"
                    placeholder={item.content}
                    helperText="回复的内容只针对主体（文章或留言），并不会回复到单条评论"
                    inputProps={{ maxLength: 150 }}
                    onChange={(e) => setError(!e.target.value.trim())}
                    error={error}
                    rows="3"
                    multiline
                    fullWidth
                    autoFocus
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>取消</Button>
                <Button type="submit" color="primary">完成</Button>
            </DialogActions>
        </Dialog>
    );
}

export function ActionDelete(props) {
    const { open, item, onCancel, onConfirm } = props;

    return (
        <Dialog key="delete" open={open} maxWidth="xs" onClose={onCancel} fullWidth>
            <DialogTitle>Caution</DialogTitle>
            <DialogContent>
                确认要删除『
                <b style={{ fontWeight: 600 }}>{` ${item.name || item.extName} `}</b>
                』的评论吗？
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>取消</Button>
                <Button color="secondary" onClick={onConfirm}>删除</Button>
            </DialogActions>
        </Dialog>
    );
}
