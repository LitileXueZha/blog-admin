import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Layout from './components/Layout/index';
import Index from './pages/index';
import Article from './pages/article';

export default function Routes() {
    return (
        <BrowserRouter>
            <Layout>
                <Route path="/index" component={Index} />
                <Route exact path="/article" component={Article} />
                <Route path="/article/edit" component={Article} />
                <Route path="/tag" component={Index} />
            </Layout>
        </BrowserRouter>
    );
}
