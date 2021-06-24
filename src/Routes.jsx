import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

// import Layout from './components/Layout';
// import AuthRoute from './components/AuthRoute';
// import Index from './pages/index';
// import Article from './pages/article';
// import Login from './pages/login';
// import Tag from './pages/tag';
// import NotFound from './pages/NotFound';
// import ArticleCreate from './pages/article/New';
// import ArticleDetail from './pages/article/NewNext';
// import ArticleTrash from './pages/article/Trash';
// import Msg from './pages/msg';
// import Comment from './pages/comment';

import lazyload from './components/lazyload';

const Layout = lazyload(() => import('./components/Layout'));
const AuthRoute = lazyload(() => import('./components/AuthRoute'));
const Index = lazyload(() => import('./pages'));
const Article = lazyload(() => import('./pages/article'));
const Login = lazyload(() => import('./pages/login'));
const Tag = lazyload(() => import('./pages/tag'));
const NotFound = lazyload(() => import('./pages/NotFound'));
const ArticleCreate = lazyload(() => import('./pages/article/New'));
const ArticleDetail = lazyload(() => import('./pages/article/NewNext'));
const ArticleTrash = lazyload(() => import('./pages/article/Trash'));
const Msg = lazyload(() => import('./pages/msg'));
const Comment = lazyload(() => import('./pages/comment'));

export default function Routes() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <AuthRoute>
                    <Route path="/">
                        <Layout>
                            <Switch>
                                <Route path="/" component={Index} exact />
                                <Route path="/article" component={Article} exact />
                                <Route path="/article/(new|draft)" component={ArticleCreate} exact />
                                <Route path="/article/trash" component={ArticleTrash} exact />
                                <Route path="/article/_/:id" component={ArticleDetail} />
                                <Route path="/tag" component={Tag} />
                                <Route path="/msg" component={Msg} />
                                <Route path="/comment" component={Comment} />
                                <Route component={NotFound} />
                            </Switch>
                        </Layout>
                    </Route>
                </AuthRoute>
            </Switch>
        </HashRouter>
    );
}
