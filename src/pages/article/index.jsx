import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Tooltip,
    ButtonBase,
    DialogContent,
    DialogActions,
    Popover,
} from '@material-ui/core';

import './index.less';
import { getArticleList, updateArticle } from '../../store/article';
import { ARTICLE_TYPE, ARTICLE_STATUS } from '../../utils/constants';
import Pagination from '../../components/Pagination';

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            current: {}, // 当前编辑的文章
            anchorEl: null,
        };
    }

    getArticleList = ({ page, size }) => {
        this.props.getArticleList({
            page: page + 1,
            size,
        });
    }

    showModal = (e, article) => {
        this.setState({
            open: true,
            current: article,
            anchorEl: e.target,
        });
    };

    hideModal = () => {
        this.setState({ open: false });
    };

    handleStatusChange = () => {
        const { id, status } = this.state.current;
        // 已上线修改为下线，否则为上线
        const nextStatus = status === 1 ? 2 : 1;

        this.props.updateArticle(id, { status: nextStatus })
            .then(this.hideModal);
    };

    renderRows() {
        const { items } = this.props.article;

        return items.map((val) => (
            <TableRow style={{ verticalAlign: 'top' }} key={val.id}>
                <TableCell>
                    <Link to={`/article/new?id=${val.id}`}>{val.title}</Link>
                </TableCell>
                <TableCell style={{ width: 400 }}>{val.summary}</TableCell>
                <TableCell>{ARTICLE_TYPE[val.category]}</TableCell>
                <TableCell>{val.tag_name}</TableCell>
                <ButtonBase component={TableCell} onClick={(e) => this.showModal(e, val)}>{ARTICLE_STATUS[val.status]}</ButtonBase>
                {/* <TableCell>{ARTICLE_STATUS[val.status]}</TableCell> */}
                <TableCell>{moment(val.create_at).format('YYYY-MM-DD HH:mm')}</TableCell>
            </TableRow>
        ));
    }

    render() {
        const { article } = this.props;
        const { open, current, anchorEl } = this.state;

        return (
            <div className="container">
                <Link to="/article/new">
                    <Button color="primary" variant="contained">
                        <ion-icon name="ios-brush" style={{ marginRight: 10 }} />
                        写文章
                    </Button>
                </Link>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>标题</TableCell>
                            <TableCell style={{ width: 400 }}>摘要</TableCell>
                            <TableCell>分类</TableCell>
                            <TableCell>标签</TableCell>
                            <TableCell>
                                <Tooltip title="点击以修改文章的状态">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        状态
                                        <ion-icon name="ios-help-circle" style={{ fontSize: 18, color: '#999' }} />
                                    </div>
                                </Tooltip>
                            </TableCell>
                            <TableCell>创建时间</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{this.renderRows()}</TableBody>

                    <Pagination count={article.total} onChange={this.getArticleList} />
                </Table>

                <Popover open={open} anchorEl={anchorEl} onClose={this.hideModal} className="popover">
                    <DialogContent>
                        <ion-icon name="ios-help-circle" class="icon-question" />
                        确认将此文章
                        <b style={{ fontWeight: 'bold' }}>{current.status === 1 ? '下线' : '上线'}</b>
                        吗？
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" size="small" onClick={this.handleStatusChange}>确定</Button>
                    </DialogActions>
                </Popover>
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
    return {
        getArticleList: (params) => dispatch(getArticleList(params)),
        updateArticle: (id, data) => dispatch(updateArticle(id, data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
