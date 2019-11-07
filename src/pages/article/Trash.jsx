import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';
import moment from 'moment';

import './Trash.less';
import { updateArticle, getArticlesInTrash } from '../../store/article';
import { ARTICLE_TYPE } from '../../utils/constants';
import Pagination from '../../components/Pagination';

class ArticleTrash extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    getArticleList = ({ page, size }) => {
        this.props.getArticlesInTrash({
            page: page + 1,
            size,
        });
    }

    handleRevoke = (id) => {
        console.log(id);
    };

    renderRows() {
        const { items } = this.props.article;

        return items.map((val) => (
            <TableRow style={{ verticalAlign: 'top' }} key={val.id}>
                <TableCell>{val.title}</TableCell>
                <TableCell>{val.summary}</TableCell>
                <TableCell>{moment(val.modify_at).format('YYYY-MM-DD HH:mm')}</TableCell>
                <TableCell className="article-actions">
                    <a role="button" onClick={() => this.handleRevoke(val.id)}>撤销</a>
                    <span className="divider">|</span>
                    <a role="button">删除</a>
                </TableCell>
            </TableRow>
        ));
    }

    render() {
        const { article } = this.props;

        return (
            <div className="container article-trash">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>标题</TableCell>
                            <TableCell style={{ width: 600 }}>简介</TableCell>
                            <TableCell>回收时间</TableCell>
                            <TableCell>操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{this.renderRows()}</TableBody>

                    <Pagination count={article.total} onChange={this.getArticleList} />
                </Table>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        article: store.article,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getArticlesInTrash,
        updateArticle,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleTrash);
