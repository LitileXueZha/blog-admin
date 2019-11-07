import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@material-ui/core';
import moment from 'moment';

import './Trash.less';
import { restoreArticleFromTrash, getArticlesInTrash, deleteArticle } from '../../store/article';
import { ARTICLE_TYPE } from '../../utils/constants';
import Pagination from '../../components/Pagination';
import Msg from '../../components/message';

class ArticleTrash extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            current: {},
        };
    }

    getArticleList = ({ page, size }) => {
        this.props.getArticlesInTrash({
            page: page + 1,
            size,
        });
    }

    handleRevoke = (id) => {
        this.props.restoreArticleFromTrash(id)
            .then(() => Msg.success('撤销成功'));
    };

    showModal = (current) => {
        this.setState({ open: true, current });
    };

    hideModal = () => {
        this.setState({ open: false });
    }

    handleDel = () => {
        const { current: { id } } = this.state;

        this.props.deleteArticle(id)
            .then(() => {
                Msg.success('删除成功');
                this.hideModal();
            });
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
                    <a role="button" onClick={() => this.showModal(val)}>删除</a>
                </TableCell>
            </TableRow>
        ));
    }

    render() {
        const { open, current } = this.state;
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

                <Dialog open={open} onClose={this.hideModal}>
                    <DialogTitle>注意</DialogTitle>
                    <DialogContent>
                        确认要把『
                        <em style={{ fontWeight: 600 }}>{current.title}</em>
                        』删除吗？
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.hideModal}>取消</Button>
                        <Button color="primary" onClick={this.handleDel}>确认</Button>
                    </DialogActions>
                </Dialog>
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
        restoreArticleFromTrash,
        deleteArticle,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleTrash);
