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
import FormArticle from './FormArticle';
import './NewNext.less';

class ArticleDetial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getTagList({ status: 1 });
    }

    handleSubmit = (data) => {
        console.log(data);
    };

    render() {
        const { tag } = this.props;

        return (
            <div className="container">
                <FormArticle onSubmit={this.handleSubmit} tagList={tag.items} />
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
