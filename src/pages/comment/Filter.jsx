import React from 'react';
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
    Divider,
} from '@material-ui/core';

import './Filter.less';

export default function Filter(props) {
    return (
        <ExpansionPanel className="filter-comment">
            <ExpansionPanelSummary expandIcon={<ion-icon name="ios-arrow-down" />}>
                <div className="filter-title">筛选所有评论</div>
                <span className="filter-content">@bdG</span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <FormControl className="form-item">
                    <FormLabel className="form-label">主体</FormLabel>
                    <RadioGroup name="category" row>
                        <FormControlLabel label="全部" value="all" control={<Radio color="primary" />} />
                        <FormControlLabel label="文章" value="note" control={<Radio color="primary" />} />
                        <FormControlLabel label="留言" value="life" control={<Radio />} />
                    </RadioGroup>
                </FormControl>
                <Divider />
                <TextField className="form-input" label="根据 parent_id 查询" />
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
                <Button color="secondary">重置</Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
}
