import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Index from './pages/index';
import Article from './pages/article';
import Login from './pages/login';
import Tag from './pages/tag';
import NotFound from './pages/NotFound';
import ArticleCreate from './pages/article/New';

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
                            <Route path="/tag" component={Tag} />
                            <Route component={NotFound} />
                        </Switch>
                    </Layout>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
