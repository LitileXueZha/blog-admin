import React from 'react';
import {
    FormControlLabel,
    Switch,
    Button,
    Select,
    MenuItem,
    Dialog,
    DialogContent,
    Menu,
} from '@material-ui/core';
import ace from '../../utils/ace';

import './New.less';
import StatusBar from './StatusBar';

class ArticleCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            preview: 'input&view',
            fullscreen: false,
        };
        this.markdownRef = React.createRef();
    }

    componentDidMount() {
        this.ace = ace.init('ace-editor', this.markdownRef.current);
    }

    handleBarChange = (act) => {
        const { fullscreen } = this.state;

        switch (act.event) {
            case 'preview':
                this.setState({ preview: act.status }, () => this.ace.resize());
                break;
            case 'input':
                this.setState({ fullscreen: !fullscreen }, () => this.ace.resize());
                break;
            case 'look':
                break;
            default:
                break;
        }
    };

    render() {
        const { preview, fullscreen } = this.state;

        return (
            <div className={`container-article-new ${preview} ${fullscreen && 'fullscreen'}`}>
                <StatusBar onChange={this.handleBarChange} fullscreen={fullscreen} />

                <div id="ace-editor" className="article-textarea" />
                <div className="article-preview markdowned" ref={this.markdownRef} title="预览"> </div>
            </div>
        );
    }
}

export default ArticleCreate;
