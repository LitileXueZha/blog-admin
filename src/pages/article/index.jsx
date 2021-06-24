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
    DialogContent,
    DialogActions,
    Popover,
} from '@material-ui/core';

import './index.less';
import { getArticleList, updateArticle, moveArticleToTrash } from '../../store/article';
import { ARTICLE_TYPE, ARTICLE_STATUS } from '../../utils/constants';
import Pagination from '../../components/Pagination';
import Msg from '../../components/message';
import { IosBrush, MdTrash, IosHelpCircle } from '../../assets/icons';

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            current: {}, // 当前编辑的文章
            anchorEl: null,
        };
        this.trashRef = React.createRef();
    }

    getArticleList = ({ page, size }) => {
        this.props.getArticleList({
            page: page + 1,
            size,
            status: [0, 1, 2],
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

    handleDragStart = (e, data) => {
        // e.dataTransfer.setDragImage(document.images[0], 0, 0);
        e.dataTransfer.setData('id', data.id);
        e.dataTransfer.dropEffect = 'link';
        e.target.classList.add('dragging');
        this.trashRef.current.classList.add('drag-over');
    };

    handleDragEnd = (e) => {
        e.target.classList.remove('dragging');
        this.trashRef.current.classList.remove('drag-over');
    };

    handleDrop = async (e) => {
        e.preventDefault();

        const id = e.dataTransfer.getData('id');

        await this.props.moveArticleToTrash(id);
        Msg.success('移动到垃圾箱成功');
    };

    handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'link';
    };

    renderRows() {
        const { items } = this.props.article;

        return items.map((val) => (
            <TableRow
                style={{ verticalAlign: 'top' }}
                key={val.id}
                onDragStart={(e) => this.handleDragStart(e, val)}
                onDragEnd={this.handleDragEnd}
                draggable
            >
                <TableCell>
                    <Link to={`/article/new?id=${val.id}`} draggable={false}>{val.title}</Link>
                </TableCell>
                <TableCell>{val.summary}</TableCell>
                <TableCell>{ARTICLE_TYPE[val.category]}</TableCell>
                <TableCell>{val.tag_name}</TableCell>
                <TableCell className={`article-status ${val.status === 2 && 'offline'}`} onClick={(e) => this.showModal(e, val)}>
                    {ARTICLE_STATUS[val.status]}
                </TableCell>
                <TableCell>{moment(val.create_at).format('YYYY-MM-DD HH:mm')}</TableCell>
            </TableRow>
        ));
    }

    render() {
        const { article } = this.props;
        const { open, current, anchorEl } = this.state;

        return (
            <div className="container">
                <Link to="/article/new" tabIndex="-1">
                    <Button color="primary" variant="contained">
                        <IosBrush style={{ marginRight: 10 }} />
                        写文章
                    </Button>
                </Link>
                <Tooltip title="拖拽列表中某一项至此放入垃圾箱">
                    <Button
                        className="trash"
                        component={Link}
                        to="/article/trash"
                        variant="outlined"
                        startIcon={<MdTrash />}
                        onDrop={this.handleDrop}
                        onDragOver={this.handleDragOver}
                        ref={this.trashRef}
                        draggable={false}
                    >
                        垃圾箱
                    </Button>
                </Tooltip>

                <Table className="article-list">
                    <TableHead>
                        <TableRow>
                            <TableCell>标题</TableCell>
                            <TableCell style={{ width: 450 }}>摘要</TableCell>
                            <TableCell>分类</TableCell>
                            <TableCell>标签</TableCell>
                            <TableCell>
                                <Tooltip title="点击以修改文章的状态">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        状态
                                        <IosHelpCircle style={{ fontSize: 18, color: '#999' }} />
                                    </div>
                                </Tooltip>
                            </TableCell>
                            <TableCell>创建时间</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{this.renderRows()}</TableBody>

                    <Pagination count={article.total} onChange={this.getArticleList} />
                </Table>

                <Popover
                    className="popover"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.hideModal}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <DialogContent>
                        <IosHelpCircle className="icon-question" />
                        确认将此文章
                        <u>{current.status === 1 ? '下线' : '上线'}</u>
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
        moveArticleToTrash: (id) => dispatch(moveArticleToTrash(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
