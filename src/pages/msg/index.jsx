import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './index.less';
import { getMsgList, updateMsg, readMsg } from '../../store/msg';
import ListItemMsg, { myselfMsg } from './ListItemMsg';

const colors = ['#ff6977', '#00bbaa', '#008b8b', '#009688', '#128378', '#4b4b4b', '#007066', '#008080'];

function getRandomColor() {
    const max = colors.length - 1;
    const randomIndex = Math.round(Math.random() * max);

    return colors[randomIndex];
}

class Msg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getMsgList();
    }

    handleMsgRead = (id) => {
        this.props.readMsg(id);
    }

    handleMsgDel = (id) => {
        console.log(id);
    }

    renderMsgList(type = 'read') {
        const { unreadItems, readItems } = this.props.msg;
        const items = type === 'read' ? readItems : unreadItems;

        return items.map((msg) => (
            <ListItemMsg
                key={msg.id}
                msg={msg}
                onRead={this.handleMsgRead}
                onDelete={this.handleMsgDel}
            />
        ));
    }

    render() {
        const { msg } = this.props;

        return (
            <div className="container container-msg">
                <List className="list-msg">
                    {msg.unreadItems.length > 0 && <ListSubheader disableSticky>未读</ListSubheader>}
                    {this.renderMsgList('unread')}
                    <ListSubheader disableSticky>已读</ListSubheader>
                    {myselfMsg}
                    {this.renderMsgList()}
                    <Button component={ListItem} color="primary">
                        <ListItemText inset disableTypography>加载更多</ListItemText>
                    </Button>
                </List>
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
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Msg);
