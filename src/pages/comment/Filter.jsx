import React, { useState } from 'react';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Button,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    TextField,
} from '@material-ui/core';

import { IosArrowDown } from '../../assets/icons';
import './Filter.less';

const TEXT_COMMENT = {
    all: '--',
    0: '文章',
    1: '留言',
};

export default function Filter(props) {
    const [type, setType] = useState('all');
    const [parentId, setParentId] = useState('');

    const onTypeChange = (e, value) => {
        setParentId('');
        setType(value);
        props.onFilter({
            type: value === 'all' ? undefined : value,
            parent_id: undefined,
        });
    };
    const onInputChange = (e) => {
        setType('all');
        setParentId(e.target.value.trim());
    };

    const onKeyPress = (e) => {
        if (e.nativeEvent.code === 'Enter') {
            props.onFilter({
                parent_id: parentId || undefined,
                type: undefined,
            });
        }
    };

    const reset = () => {
        setType('all');
        setParentId('');
        props.onFilter({ parent_id: undefined, type: undefined });
    };

    const renderContent = () => {
        if (parentId) {
            return `@${parentId}`;
        }

        return TEXT_COMMENT[type];
    };

    return (
        <ExpansionPanel className="filter-comment" defaultExpanded>
            <ExpansionPanelSummary expandIcon={<IosArrowDown />}>
                <div className="filter-title">筛选所有评论:</div>
                <span className="filter-content">{renderContent()}</span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <FormControl className="form-item">
                    <FormLabel className="form-label">主体</FormLabel>
                    <RadioGroup name="category" value={type} onChange={onTypeChange} row>
                        <FormControlLabel label="全部" value="all" control={<Radio />} />
                        <FormControlLabel label="文章" value="0" control={<Radio color="primary" />} />
                        <FormControlLabel label="留言" value="1" control={<Radio color="primary" />} />
                    </RadioGroup>
                </FormControl>
                <div className="form-input">
                    <TextField
                        name="searchContent"
                        InputLabelProps={{ shrink: true }}
                        label="根据 parent_id 查询"
                        placeholder="请输入"
                        value={parentId}
                        onChange={onInputChange}
                        onKeyPress={onKeyPress}
                        fullWidth
                    />
                </div>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
                <Button color="secondary" onClick={reset}>重置</Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
}
