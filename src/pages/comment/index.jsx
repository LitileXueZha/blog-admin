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

import './index.less';
import { getCommentList, deleteComment, addComment } from '../../store/comment';
import Pagination from '../../components/Pagination';
import { ActionReply, ActionDelete } from './ModalActions';
import Msg from '../../components/message';
import { LABEL_COMMENT } from '../../utils/constants';
import Filter from './Filter';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: -1,
            modal: {
                open: false,
                type: '', // delete-删除、reply-回复
                item: {}, // 当前操作项
            },
        };
        this.params = {}; // 查询参数
    }

    componentDidMount() {
        // this.props.getCommentList();
    }

    getCommentList = (params) => {
        if (params) {
            // 存储筛选参数
            this.params = params;
        }

        const { currentTab } = this.state;
        let { page, size } = this.params;

        this.props.getCommentList({
            type: currentTab !== -1 ? currentTab : undefined,
            page: page + 1,
            size,
        });
    }

    handleTabChange = (e, value) => {
        const { currentTab } = this.state;

        // 相同页不做处理
        if (currentTab === value) return;

        this.setState({ currentTab: value }, this.getCommentList);
    };

    showModal = (type, item) => {
        this.setState({
            modal: {
                open: true,
                type,
                item,
            },
        });
    };

    hideModal = () => {
        this.setState({
            modal: {
                ...this.state.modal,
                open: false,
            },
        });
    };

    handleConfirm = async (data) => {
        const { type: modalType, item } = this.state.modal;

        switch (modalType) {
            case 'delete':
                await this.props.deleteComment(item.id);
                Msg.success('删除成功');
                this.hideModal();
                break;
            case 'reply': {
                const { type, parent_id } = item;
                const body = {
                    ...data,
                    type,
                    parent_id,
                    label: LABEL_COMMENT.ADMIN,
                };

                await this.props.addComment(body);
                Msg.success('回复成功');
                this.hideModal();
                break;
            }
            default:
                break;
        }
    };

    renderRows() {
        const { items } = this.props.comment;

        return items.map((item, index) => {
            let { name, label } = item;
            const isAdmin = label === LABEL_COMMENT.ADMIN;

            if (!name) {
                // 匿名用户。设置其名称
                item.extName = `匿名用户#${index + 1}`;
                name = <span className="comment-name-unknow">{item.extName}</span>;
            }

            if (isAdmin) {
                // 自己的回复
                item.extName = '诸葛林';
                name = <span className="comment-name-admin" title="我的评论">{item.extName}</span>;
            }

            return (
                <TableRow key={item.id} style={{ verticalAlign: 'top' }}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{item.content}</TableCell>
                    <TableCell>{item.type ? '留言' : '文章'}</TableCell>
                    <TableCell>{moment(item.create_at).format('YYYY-MM-DD hh:mm:ss')}</TableCell>
                    <TableCell className="comment-actions">
                        <a className={isAdmin ? 'disabled' : undefined} role="button" onClick={() => this.showModal('reply', item)}>回复</a>
                        <span className="divider">|</span>
                        <a role="button" onClick={() => this.showModal('delete', item)}>删除</a>
                    </TableCell>
                </TableRow>
            );
        });
    }

    render() {
        const { currentTab, modal } = this.state;
        const { comment } = this.props;
        const ModalAction = modal.type === 'reply' ? ActionReply : ActionDelete;

        return (
            <>
                <Filter />
                <div className="container container-comment">
                    <Table className="table-comment">
                        <TableHead>
                            <TableRow>
                                <TableCell>用户名</TableCell>
                                <TableCell style={{ width: 500 }}>内容</TableCell>
                                <TableCell>主体</TableCell>
                                <TableCell>评论时间</TableCell>
                                <TableCell>操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{this.renderRows()}</TableBody>
                        <Pagination count={comment.total} onChange={this.getCommentList} />
                    </Table>

                    <ModalAction
                        open={modal.open}
                        item={modal.item}
                        onCancel={this.hideModal}
                        onConfirm={this.handleConfirm}
                    />
                </div>
            </>
        );
    }
}

function mapStateToProps(store) {
    return {
        comment: store.comment,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCommentList,
        deleteComment,
        addComment,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
