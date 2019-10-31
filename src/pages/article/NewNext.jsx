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
    Button,
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';

import { getTagList } from '../../store/tag';
import { getArticle } from '../../store/article';
import FormArticle from './FormArticle';
import './NewNext.less';

class ArticleDetial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        const { match: { params: { id = 'new-next' } } } = this.props;

        if (id !== 'new-next') {
            this.id = id;
        }
    }

    componentDidMount() {
        if (this.id) {
            this.props.getArticle(this.id);
        }
        this.props.getTagList({ status: 1 });
    }

    handleSubmit = (data) => {
        console.log(data);
    };

    handleWrite = () => {
        const { history } = this.props;

        if (this.id) {
            history.replace(`/article/new?id=${this.id}`);
            return;
        }

        // 新创建的文章直接返回
        history.goBack();
    };

    render() {
        const { tag, article } = this.props;

        return (
            <div className="container">
                <FormArticle
                    onSubmit={this.handleSubmit}
                    defaultValue={this.id ? article.current : {}}
                    tagList={tag.items}
                    type={this.id ? 'edit' : 'create'}
                >
                    <Button style={{ marginLeft: 20 }} onClick={this.handleWrite}>修改内容</Button>
                </FormArticle>
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
        getArticle,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetial);
