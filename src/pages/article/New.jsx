import React from 'react';
import htmlReactParser from 'html-react-parser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ace from '../../utils/ace';
import './New.less';
import StatusBar from './StatusBar';
import { getArticle, updateArticle } from '../../store/article';
import Msg from '../../components/message';

class ArticleEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            preview: 'input&view',
            fullscreen: false,
            html: '',
        };
        this.markdownRef = React.createRef();
        // 文章 id
        this.id = new URLSearchParams(props.location.search).get('id');
    }

    componentDidMount() {
        this.ace = ace.init('ace-editor', this.markdownRef.current);
        if (this.id) {
            // 仅编辑已存在的文章添加快捷键，草稿不用
            this.ace.commands.addCommand({
                name: 'save',
                bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
                exec: () => this.handleBarChange({ event: 'save' }),
            });
        }
        ace.listen(this.ace, (html, cb) => {
            const { html: _html } = this.state;

            this.setState(
                { html },
                () => cb(_html),
            );
        }, this.getArticleContent);
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

    // 根据返回的内容渲染。`false` 代表使用缓存
    getArticleContent = () => new Promise((resolve) => {
        if (this.id) {
            this.props.getArticle(this.id)
                .then(({ payload }) => resolve(payload.content))
                .catch(() => resolve(false));
            return;
        }

        resolve(false);
    });

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
                this.props.history.push(`/article/${this.id || 'new-next'}`);
                break;
            case 'save': {
                const content = localStorage.getItem('cache_article');
                let $tmp = document.createElement('p');

                // 使用 dom 提取纯文本
                $tmp.innerHTML = localStorage.getItem('cache_article_html');

                const { textContent } = $tmp;

                // 释放内存
                $tmp = null;
                this.props.updateArticle(this.id, { content, text_content: textContent })
                    .then(() => Msg.success('保存成功'));
                break;
            }
            default:
                break;
        }
    };

    render() {
        const { preview, fullscreen, html } = this.state;
        const { article } = this.props;
        let htmlNodes;

        try {
            htmlNodes = htmlReactParser(html);
        } catch (e) {
            htmlNodes = <p style={{ color: 'red' }}>解析异常 {e.message}</p>;
        }

        return (
            <div className={`container-article-new ${preview} ${fullscreen && 'fullscreen'}`}>
                <StatusBar
                    onChange={this.handleBarChange}
                    fullscreen={fullscreen}
                    showSave={this.id}
                />

                <div id="ace-editor" className="article-textarea" />
                <div className="article-preview markdowned" ref={this.markdownRef}>
                    <h1 className="title">{(this.id && article.title) || '文章标题~文章标题~文章标题~'}</h1>
                    <div className="body">{htmlNodes}</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        article: store.article.current,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getArticle,
        updateArticle,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEditor);
