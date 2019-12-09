import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './index.less';
import { getMsgList, updateMsg, readMsg, deleteMsg, loadMoreMsg } from '../../store/msg';
import ListItemMsg, { myselfMsg } from './ListItemMsg';
import Message from '../../components/message';

class Msg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            current: {},
        };
    }

    componentDidMount() {
        this.props.getMsgList();
    }

    handleMsgRead = (id) => {
        this.props.readMsg(id);
    }

    handleMsgDel = async () => {
        const { current } = this.state;

        await this.props.deleteMsg(current.id);
        this.hideModal();
        Message.success('删除成功');
    };

    showModal = (msg) => {
        this.setState({
            open: true,
            current: msg,
        });
    }

    hideModal = () => {
        this.setState({ open: false });
    };

    renderMsgList(type = 'read') {
        const { unreadItems, readItems } = this.props.msg;
        const items = type === 'read' ? readItems : unreadItems;

        return items.map((msg) => (
            <ListItemMsg
                key={msg.id}
                msg={msg}
                onRead={() => this.handleMsgRead(msg.id)}
                onDelete={() => this.showModal(msg)}
            />
        ));
    }

    renderLastItem = () => {
        const { items, total } = this.props.msg;

        if (items.length === total) {
            // 加载完成
            return (
                <ListItem button>
                    <ListItemText inset disableTypography>暂无更多~</ListItemText>
                </ListItem>
            );
        }
    };

    render() {
        const { open, current } = this.state;
        const { msg, loadMoreMsg } = this.props;
        const loadComplete = msg.total === msg.items.length;

        return (
            <div className="container container-msg">
                <List className="list-msg">
                    {msg.unreadItems.length > 0 && (
                        <ListSubheader disableSticky>
                            未读
                            <span className="msg-unread">{msg.totalUnread}</span>
                        </ListSubheader>
                    )}
                    {this.renderMsgList('unread')}
                    <ListSubheader disableSticky>已读</ListSubheader>
                    {myselfMsg}
                    {this.renderMsgList()}
                    <Button component={ListItem} onClick={() => loadMoreMsg()} color="primary" disabled={loadComplete}>
                        <ListItemText inset disableTypography>{loadComplete ? '暂无更多了~' : '加载更多'}</ListItemText>
                    </Button>
                </List>

                <Dialog open={open} maxWidth="xs" fullWidth>
                    <DialogTitle>Caution</DialogTitle>
                    <DialogContent>
                        确认要删除『
                        <em style={{ fontWeight: 600 }}>{` ${current.name} `}</em>
                        』的评论吗？
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.hideModal}>取消</Button>
                        <Button color="secondary" onClick={this.handleMsgDel}>删除</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        msg: store.msg,
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMsgList,
        updateMsg,
        readMsg,
        deleteMsg,
        loadMoreMsg,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Msg);
