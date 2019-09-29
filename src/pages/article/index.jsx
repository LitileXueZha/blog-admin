import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

import './index.less';
import { getArticleList } from '../../store/article';
import { ARTICLE_TYPE, ARTICLE_STATUS } from '../../utils/constants';

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.getArticleList();
    }

    renderRows() {
        const { items } = this.props.article;

        return items.map((val) => (
            <TableRow>
                <TableCell>{val.title}</TableCell>
                <TableCell style={{ width: 400 }}>{val.summary}</TableCell>
                <TableCell>{ARTICLE_TYPE[val.category]}</TableCell>
                <TableCell>{val.tag_name}</TableCell>
                <TableCell>{ARTICLE_STATUS[val.status]}</TableCell>
                <TableCell>{val.create_at}</TableCell>
            </TableRow>
        ));
    }

    render() {
        return (
            <div className="container">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus perspiciatis natus saepe pariatur cumque laudantium consequatur, molestiae nobis maxime eligendi labore atque, nostrum minima. Distinctio nemo officiis consectetur illum eum.

                <Link to="/article/edit">写文章</Link>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>标题</TableCell>
                            <TableCell>摘要</TableCell>
                            <TableCell>分类</TableCell>
                            <TableCell>标签</TableCell>
                            <TableCell>状态</TableCell>
                            <TableCell>创建时间</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{this.renderRows()}</TableBody>
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
