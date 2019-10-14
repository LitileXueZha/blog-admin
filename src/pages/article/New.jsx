import React from 'react';
import { TextareaAutosize, Tooltip } from '@material-ui/core';
import ace from '../../utils/ace';

import './New.less';

class ArticleCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        ace.init('ace-editor');
    }

    render() {
        return (
            <div className="container-article-new">
                <Tooltip title="powerd by ace-editor">
                    <div id="ace-editor" className="article-textarea" />
                </Tooltip>

                <Tooltip title="预览">
                    <div className="article-preview markdowned"> </div>
                </Tooltip>
            </div>
        );
    }
}

export default ArticleCreate;
