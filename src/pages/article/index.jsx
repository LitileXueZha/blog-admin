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
    TableFooter,
    TablePagination,
    Button,
} from '@material-ui/core';

import './index.less';
import { getArticleList } from '../../store/article';
import { ARTICLE_TYPE, ARTICLE_STATUS } from '../../utils/constants';

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 10,
        };
    }

    componentDidMount() {
        this.getArticleList();
    }

    getArticleList() {
        const { page, rowsPerPage } = this.state;

        this.props.getArticleList({
            page: page + 1,
            size: rowsPerPage,
        });
    }

    handlePageChange = (e, page) => {
        this.setState({ page }, () => this.getArticleList());
    };

    handlePerChange = (e) => {
        const rowsPerPage = e.target.value;

        this.setState({ rowsPerPage }, () => this.getArticleList());
    };

    renderRows() {
        const { items } = this.props.article;

        return items.map((val) => (
            <TableRow style={{ verticalAlign: 'top' }} key={val.id}>
                <TableCell>{val.title}</TableCell>
                <TableCell style={{ width: 400 }}>{val.summary}</TableCell>
                <TableCell>{ARTICLE_TYPE[val.category]}</TableCell>
                <TableCell>{val.tag_name}</TableCell>
                <TableCell>{ARTICLE_STATUS[val.status]}</TableCell>
                <TableCell>{moment(val.create_at).format('YYYY-MM-DD HH:mm')}</TableCell>
            </TableRow>
        ));
    }

    render() {
        const { article } = this.props;
        const { rowsPerPage, page } = this.state;

        return (
            <div className="container">
                <Link to="/article/edit">
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
                            <TableCell>状态</TableCell>
                            <TableCell>创建时间</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{this.renderRows()}</TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                style={{ border: 'none' }}
                                rowsPerPageOptions={[5, 10, 25]}
                                rowsPerPage={rowsPerPage}
                                count={article.total}
                                page={page}
                                onChangePage={this.handlePageChange}
                                onChangeRowsPerPage={this.handlePerChange}
                            />
                        </TableRow>
                    </TableFooter>
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
    return {
        getArticleList: (params) => dispatch(getArticleList(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
