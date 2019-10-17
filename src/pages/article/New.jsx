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
import htmlReactParser from 'html-react-parser';
import { Parser } from 'html-to-react';

import ace from '../../utils/ace';
import './New.less';
import StatusBar from './StatusBar';

const { parse } = new Parser();
let mermaidCb;

class ArticleCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            preview: 'input&view',
            fullscreen: false,
            html: '',
        };
        this.markdownRef = React.createRef();
    }

    componentDidMount() {
        this.ace = ace.init('ace-editor', this.markdownRef.current);
        ace.listen(this.ace, (html, cb) => {
            // this.updateController = cb;
            mermaidCb = cb;
            console.log(html)
            this.setState({ html });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState)
        // 别在这里使用 this，会有莫名其妙的问题
        if (mermaidCb) {
            mermaidCb();
            mermaidCb = null;
        }
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
        const { preview, fullscreen, html } = this.state;

        return (
            <div className={`container-article-new ${preview} ${fullscreen && 'fullscreen'}`}>
                <StatusBar onChange={this.handleBarChange} fullscreen={fullscreen} />

                <div id="ace-editor" className="article-textarea" />
                <div className="article-preview markdowned" ref={this.markdownRef} title="预览">
                    {htmlReactParser(html)}
                </div>
            </div>
        );
    }
}

export default ArticleCreate;
