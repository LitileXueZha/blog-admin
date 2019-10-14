import React from 'react';
import { TextareaAutosize, Tooltip } from '@material-ui/core';

import './New.less';

class ArticleCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="container-article-new">
                <Tooltip title="powerd by ace-editor">
                    <TextareaAutosize className="article-textarea" placeholder="输入文章内容" autoFocus />
                </Tooltip>

                <div className="article-preview markdowned"> </div>
            </div>
        );
    }
}

export default ArticleCreate;
