import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import loadable from 'react-loadable';

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

const Layout = loadable({ loader: () => import('./components/Layout') });
const AuthRoute = loadable({ loader: () => import('./components/AuthRoute') });
const Index = loadable({ loader: () => import('./pages') });
const Article = loadable({ loader: () => import('./pages/article') });
const Login = loadable({ loader: () => import('./pages/login') });
const Tag = loadable({ loader: () => import('./pages/tag') });
const NotFound = loadable({ loader: () => import('./pages/NotFound') });
const ArticleCreate = loadable({ loader: () => import('./pages/article/New') });
const ArticleDetail = loadable({ loader: () => import('./pages/article/NewNext') });
const ArticleTrash = loadable({ loader: () => import('./pages/article/Trash') });
const Msg = loadable({ loader: () => import('./pages/msg') });
const Comment = loadable({ loader: () => import('./pages/comment') });

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <AuthRoute>
                    <Route path="/">
                        <Layout>
                            <Switch>
                                <Route path="/" component={Index} exact />
                                <Route path="/article" component={Article} exact />
                                <Route path="/article/new" component={ArticleCreate} exact />
                                <Route path="/article/trash" component={ArticleTrash} exact />
                                <Route path="/article/:id" component={ArticleDetail} />
                                <Route path="/tag" component={Tag} />
                                <Route path="/msg" component={Msg} />
                                <Route path="/comment" component={Comment} />
                                <Route component={NotFound} />
                            </Switch>
                        </Layout>
                    </Route>
                </AuthRoute>
            </Switch>
        </BrowserRouter>
    );
}
