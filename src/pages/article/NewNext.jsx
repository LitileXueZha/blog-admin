import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    TextField,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
    FormControlLabel,
} from '@material-ui/core';

import { getTagList } from '../../store/tag';

class ArticleDetial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getTagList({ status: 1 });
    }

    render() {
        return (
            <div className="container">
                <form>
                    <TextField label="标题" />
                    <TextField label="文章摘要" multiline />
                    <FormControl>
                        <FormLabel>分类</FormLabel>
                        <RadioGroup name="category" row>
                            <FormControlLabel label="生活" value="life" control={<Radio color="primary" />} />
                            <FormControlLabel label="笔记" value="note" control={<Radio />} />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>标签</FormLabel>
                        <RadioGroup name="tag" row>
                            <FormControlLabel label="生活" value="life" control={<Radio color="primary" />} />
                            <FormControlLabel label="笔记" value="note" control={<Radio />} />
                        </RadioGroup>
                    </FormControl>
                </form>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        article: store.article,
        tag: store.tag,
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTagList,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetial);
