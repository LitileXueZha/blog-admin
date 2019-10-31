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

import ace from '../../utils/ace';
import './New.less';
import StatusBar from './StatusBar';

class ArticleEditor extends React.Component {
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
            const { html: _html } = this.state;

            this.setState(
                { html },
                () => cb(_html),
            );
        });
        window.addEventListener('resize', () => {
            // 使用 fullscreenElement 查询当前全屏元素出现问题。退出后仍存在，但是 F12 时居然没了
            // FIXME: 我无能为力...
            // const isFullscreen = document.fullscreenElement
            //     || document.mozFullScreenElement
            //     || document.webkitFullscreenElement;

            // 修复退出全屏后 ace 编辑器大小问题
            if (this.isFullscreen) {
                this.isFullscreen = false;
                setTimeout(() => this.ace.resize(), 100);
            }
        });
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
            case 'look': {
                const $m = this.markdownRef.current;
                const fullScreen = $m.requestFullscreen
                    || $m.webkitRequestFullscreen
                    || $m.mozRequestFullScreen
                    || $m.msRequestFullscreen;

                fullScreen.call($m);
                setTimeout(() => {
                    this.isFullscreen = true;
                }, 100);
                break;
            }
            case 'next':
                this.props.history.push('/article/new-next');
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
                    <h1 className="title">文章标题~文章标题~文章标题~</h1>
                    <div className="body">{htmlReactParser(html)}</div>
                </div>
            </div>
        );
    }
}

export default ArticleEditor;
