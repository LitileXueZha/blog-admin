import React from 'react';
import htmlReactParser from 'html-react-parser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ace, {
    ACE_STORAGE_DRAFT,
    ACE_STORAGE_ARTICLE,
    ACE_STORAGE_LOCAL,
} from '../../../utils/ace.js';
import './index.less';
import StatusBar from './StatusBar.jsx';
import { getArticle, updateArticle } from '../../../store/article.js';
import Msg from '../../../components/message.js';
import draft from './draft.md';

const TYPE_PAGE_EDIT = 'new'; // 新建/编辑
const TYPE_PAGE_DRAFT = 'draft'; // 本地草稿

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

        const type = props.match.params[0];
        let aceCacheKey;

        if (this.id) aceCacheKey = ACE_STORAGE_ARTICLE;
        else if (type === TYPE_PAGE_DRAFT) {
            aceCacheKey = ACE_STORAGE_LOCAL;
        } else aceCacheKey = ACE_STORAGE_DRAFT;

        this.type = type;
        this.aceCacheKey = aceCacheKey;
    }

    componentDidMount() {
        this.isMount = true;
        this.getArticleContent().then((content) => {
            if (!this.isMount) return;

            ace.init('ace-editor', {
                content,
                useCache: content === false,
                cacheKey: this.aceCacheKey,
            });
            ace.addChangeListener((markedHtml, cbRenderer) => {
                const { html: prevHtml } = this.state;

                // 在 react 渲染完成后再处理额外的渲染工作，比如 mermaid、mathjax
                this.setState(
                    { html: markedHtml },
                    () => cbRenderer(prevHtml),
                );
            });
            ace.editor.commands.addCommand({
                name: 'save',
                bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
                exec: () => {
                    if (!this.id) {
                        return;
                    }
                    // 仅编辑已存在的文章添加快捷键，草稿不用
                    this.handleBarChange({ event: 'save' });
                },
            });

            // 本地草稿无数据加载默认内容
            if (!ace.storage.getValues().content && this.type === TYPE_PAGE_DRAFT) {
                ace.editor.setValue(draft);
                ace.editor.clearSelection();
            }
        });
        window.addEventListener('resize', this.handleAceFullscreen);
    }

    componentWillUnmount() {
        this.isMount = false;
        window.removeEventListener('resize', this.handleAceFullscreen);
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

    handleAceFullscreen = () => {
        // 使用 fullscreenElement 查询当前全屏元素出现问题。退出后仍存在，但是 F12 时居然没了
        // FIXME: 我无能为力...
        // const isFullscreen = document.fullscreenElement
        //     || document.mozFullScreenElement
        //     || document.webkitFullscreenElement;

        // 修复退出全屏后 ace 编辑器大小问题
        if (this.isFullscreen) {
            this.isFullscreen = false;
            setTimeout(() => ace.resize(), 100);
        }
    };

    handleBarChange = (act) => {
        const { fullscreen } = this.state;

        switch (act.event) {
            case 'preview':
                this.setState({ preview: act.status }, () => ace.resize());
                break;
            case 'input':
                this.setState({ fullscreen: !fullscreen }, () => ace.resize());
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
                this.props.history.push(`/article/_/${this.id || 'new-next'}`);
                break;
            case 'save': {
                const { content, html } = ace.storage.getValues();
                let $tmp = document.createElement('p');

                // 使用 dom 提取纯文本
                $tmp.innerHTML = html;

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
                    disableNext={this.type === TYPE_PAGE_DRAFT}
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
