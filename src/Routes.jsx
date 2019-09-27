import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Index from './pages/index';
import Article from './pages/article';
import Login from './pages/login';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/">
                    <Layout>
                        <Switch>
                            <Route path="/" component={Index} exact />
                            <Route path="/article" component={Article} />
                            <Route path="/article/edit" component={Article} />
                            <Route path="/tag" component={Index} />
                        </Switch>
                    </Layout>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
