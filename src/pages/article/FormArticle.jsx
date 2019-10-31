import React, { useState, useEffect } from 'react';
import {
    TextField,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    Button,
    Chip,
    Avatar,
    Switch,
    Dialog,
    DialogContent,
} from '@material-ui/core';

import Msg from '../../components/message';

export default function FormArticle(props) {
    const { defaultValue, type } = props;
    const [tagId, setTagId] = useState('none');
    const [count, setCount] = useState(0);
    const [error, setError] = useState(false);
    const submit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = {
            title: form.title.value.trim(),
            summary: form.summary.value.trim(),
            category: form.category.value,
            tag: tagId,
        };

        if (!formData.title) {
            setError(true);
            return;
        }

        props.onSubmit(formData);
    };

    const renderTags = () => {
        const { tagList } = props;

        return tagList.map((tag) => {
            if (tag.id === tagId) {
                return (
                    <Chip
                        className="tag"
                        key={tag.id}
                        label={tag.name}
                        color="primary"
                        avatar={<Avatar style={{ textTransform: 'uppercase' }}>{tag.name[0]}</Avatar>}
                    />
                );
            }

            return (
                <Chip className="tag" key={tag.id} label={tag.name} variant="outlined" onClick={() => setTagId(tag.id)} />
            );
        });
    };

    useEffect(() => {
        setTagId(defaultValue.tag);
        setCount((defaultValue.summary || '').length);
    }, [defaultValue]);

    return (
        <form className="form-article" onSubmit={submit} key={defaultValue.id}>
            <TextField
                className="form-item"
                style={{ display: 'block', marginBottom: 0 }}
                name="title"
                label="标题"
                inputProps={{ maxLength: 20, className: 'input-title' }}
                defaultValue={defaultValue.title}
                error={error}
                helperText={error ? '文章标题不能为空' : ' '}
                onChange={(e) => setError(!e.target.value.trim())}
                fullWidth
            />
            <TextField
                className="form-item"
                name="summary"
                label="文章摘要"
                placeholder="一些文章简介"
                InputLabelProps={{ shrink: true }}
                inputProps={{ maxLength: 200 }}
                defaultValue={defaultValue.summary}
                rows={3}
                multiline
                fullWidth
                onChange={(e) => setCount(e.target.value.length)}
            />
            <span className="textarea-count">
                <span style={{ color: '#666' }}>{count}</span>
                /200
            </span>
            {type === 'create'
                && (
                    <FormControl className="form-item" style={{ marginBottom: 0 }}>
                        <FormLabel className="form-label">发布状态</FormLabel>
                        <FormControlLabel label="上线" control={<Switch color="primary" />} />
                    </FormControl>
                )}
            <FormControl className="form-item">
                <FormLabel className="form-label">文章分类</FormLabel>
                <RadioGroup name="category" defaultValue={defaultValue.category || 'note'} row>
                    <FormControlLabel label="笔记" value="note" control={<Radio color="primary" />} />
                    <FormControlLabel label="生活" value="life" control={<Radio />} />
                </RadioGroup>
            </FormControl>
            <div className="form-item">
                <label className="form-label" style={{ alignSelf: 'flex-start' }}>标签</label>
                <div className="tag-list">{renderTags()}</div>
            </div>

            <Button style={{ width: 140, marginLeft: 84 }} type="submit" color="primary" variant="contained">保存</Button>
            {props.children}
        </form>
    );
}
