import React, { useState } from 'react';
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
} from '@material-ui/core';

export default function FormArticle(props) {
    const [tagId, setTagId] = useState('none');
    const submit = (e) => {
        e.preventDefault();

        console.log(e.target.elements);
    };

    const renderTags = () => {
        const { tagList } = props;

        return tagList.map((tag) => {
            if (tag.id === tagId) {
                return (
                    <Chip
                        key={tag.id}
                        label={tag.name}
                        color="primary"
                        avatar={<Avatar style={{ textTransform: 'uppercase' }}>{tag.name[0]}</Avatar>}
                    />
                );
            }

            return (
                <Chip key={tag.id} label={tag.name} variant="outlined" onClick={() => setTagId(tag.id)} />
            );
        });
    };

    return (
        <form className="form-article" onSubmit={submit}>
            <TextField style={{ marginTop: 20 }} name="title" label="标题" fullWidth />
            <TextField style={{ marginTop: 20 }} name="summary" label="文章摘要" rows={3} multiline fullWidth />
            <FormControl style={{ marginTop: 20 }}>
                <FormLabel>分类</FormLabel>
                <RadioGroup name="category" row>
                    <FormControlLabel label="生活" value="life" control={<Radio color="primary" />} />
                    <FormControlLabel label="笔记" value="note" control={<Radio />} />
                </RadioGroup>
            </FormControl>
            <br />
            <FormLabel>标签</FormLabel>
            <br />
            {renderTags()}
            <FormControl style={{ marginTop: 20 }}>
                <RadioGroup name="tag" row>
                    <FormControlLabel label="生活" value="life" control={<Radio color="primary" />} />
                    <FormControlLabel label="笔记" value="note" control={<Radio />} />
                </RadioGroup>
            </FormControl>
            <br />

            <Button type="submit" style={{ width: 150 }} color="primary" variant="contained">保存</Button>
        </form>
    );
}
