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
} from '@material-ui/core';

import './index.less';
import { getArticleList } from '../../store/article';
import { ARTICLE_TYPE, ARTICLE_STATUS } from '../../utils/constants';
import Pagination from '../../components/Pagination';

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    getArticleList = ({ page, size }) => {
        this.props.getArticleList({
            page: page + 1,
            size,
        });
    }

    renderRows() {
        const { items } = this.props.article;

        return items.map((val) => (
            <TableRow style={{ verticalAlign: 'top' }} key={val.id}>
                <TableCell>
                    <Link to={`/article/${val.id}`}>{val.title}</Link>
                </TableCell>
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
                            <TableCell>状态</TableCell>
                            <TableCell>创建时间</TableCell>
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
    return {
        getArticleList: (params) => dispatch(getArticleList(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
