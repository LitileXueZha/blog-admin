import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Index from './pages/index';
import Article from './pages/article';
import Login from './pages/login';
import Tag from './pages/tag';
import NotFound from './pages/NotFound';
import ArticleCreate from './pages/article/New';
import ArticleDetail from './pages/article/NewNext';
import ArticleTrash from './pages/article/Trash';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/">
                    <Layout>
                        <Switch>
                            <Route path="/" component={Index} exact />
                            <Route path="/article" component={Article} exact />
                            <Route path="/article/new" component={ArticleCreate} exact />
                            <Route path="/article/trash" component={ArticleTrash} exact />
                            <Route path="/article/:id" component={ArticleDetail} />
                            <Route path="/tag" component={Tag} />
                            <Route component={NotFound} />
                        </Switch>
                    </Layout>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
