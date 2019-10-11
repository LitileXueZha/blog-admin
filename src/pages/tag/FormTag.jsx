import React, { useState } from 'react';
import {
    TextField,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@material-ui/core';

function FormTag(props, ref) {
    const [status, setStatus] = useState(1);
    const [error, setError] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        if (error) return;

        const form = e.target;
        const id = form.id.value.trim();
        const name = form.name.value.trim();

        props.onSubmit({ id, name, status });
    };

    // 校验标签 id
    const validateId = (e) => {
        const success = /^\w+$/.test(e.target.value);

        setError(!success);
    };

    return (
        <form onSubmit={submit}>
            <TextField
                name="id"
                label="标签id"
                placeholder="仅英文数字组合"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={validateId}
                error={error}
                helperText={error ? '仅支持英文数字组合' : ' '}
                fullWidth
                required
            />
            <TextField
                name="name"
                style={{ marginBottom: 20 }}
                label="展示名称"
                placeholder="中英文、表情都可"
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                required
            />
            <FormControl style={{ margin: '20px 0' }}>
                <FormLabel>状态</FormLabel>
                <RadioGroup name="status" value={status} onChange={(e) => setStatus(+e.target.value)} row>
                    <FormControlLabel
                        label="可用"
                        value={1}
                        control={<Radio color="primary" />}
                    />
                    <FormControlLabel
                        label="不可用"
                        value={2}
                        control={<Radio color="default" />}
                    />
                </RadioGroup>
            </FormControl>

            <button type="submit" ref={ref} style={{ visibility: 'hidden' }}>submit</button>
        </form>
    );
}

export default React.forwardRef(FormTag);
