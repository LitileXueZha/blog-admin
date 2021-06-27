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

import ace, {
    AceEditorStorage,
    ACE_STORAGE_DRAFT,
    ACE_STORAGE_ARTICLE,
} from '../../../utils/ace.js';
import { getTagList } from '../../../store/tag.js';
import { getArticle, addArticle, updateArticle } from '../../../store/article.js';
import Msg from '../../../components/message.js';
import FormArticle from './FormArticle.jsx';
import './index.less';

class ArticleDetial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        const { match: { params: { id = 'new-next' } } } = this.props;

        if (id !== 'new-next') {
            this.id = id;
        }
        // 页面刷新后，导致上个页面的 ace 存储丢失
        if (!ace.storage) {
            ace.storage = new AceEditorStorage(this.id ? ACE_STORAGE_ARTICLE : ACE_STORAGE_DRAFT);
        }
    }

    componentDidMount() {
        if (this.id) {
            this.props.getArticle(this.id);
        }
        this.props.getTagList({ status: 1 });
    }

    handleSubmit = async (data) => {
        const { content, html } = ace.storage.getValues();
        let $tmp = document.createElement('p');

        // 使用 dom 提取纯文本
        $tmp.innerHTML = html;

        const { textContent } = $tmp;

        // 释放内存
        $tmp = null;

        const body = { ...data, content, text_content: textContent };

        if (this.id) {
            // 更新
            await this.props.updateArticle(this.id, body);
            Msg.success('保存成功');
        } else {
            await this.props.addArticle(body);
            Msg.success('创建成功');
            // 清空缓存
            ace.storage.setValues();
        }

        this.props.history.replace('/article');
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
                    defaultValue={this.id ? article : {}}
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
        article: store.article.current,
        tag: store.tag,
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTagList,
        getArticle,
        addArticle,
        updateArticle,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetial);
