import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Tabs,
    Tab,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';
import moment from 'moment';

import './index.less';
import { getCommentList } from '../../store/comment';
import Pagination from '../../components/Pagination';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: -1,
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

    renderRows() {
        const { items } = this.props.comment;

        return items.map((item) => (
            <TableRow key={item.id}>
                <TableCell>{item.content}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{moment(item.create_at).format('YYYY-MM-DD hh:mm:ss')}</TableCell>
            </TableRow>
        ));
    }

    render() {
        const { currentTab } = this.state;
        const { comment } = this.props;

        return (
            <>
                <Tabs className="tab-comment" onChange={this.handleTabChange} value={currentTab} indicatorColor="primary" textColor="primary">
                    <Tab label="全部评论" value={-1} />
                    <Tab label="文章" value={0} />
                    <Tab label="留言" value={1} />
                </Tabs>
                <div className="container container-comment">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>内容</TableCell>
                                <TableCell>主体</TableCell>
                                <TableCell>评论时间</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{this.renderRows()}</TableBody>
                        <Pagination count={comment.total} onChange={this.getCommentList} />
                    </Table>
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
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
