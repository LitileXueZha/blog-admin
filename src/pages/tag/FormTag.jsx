import React, { useState } from 'react';
import { TextField,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@material-ui/core';

export default function FormTag(props) {
    const [status, setStatus] = useState(1);

    return (
        <form onSubmit={console.log}>
            <TextField
                name="id"
                label="标签id"
                placeholder="仅英文数字组合"
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                required
            />
            <TextField
                name="name"
                style={{ margin: '20px 0' }}
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
        </form>
    );
}
