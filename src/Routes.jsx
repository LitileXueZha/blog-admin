import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Layout from './components/Layout/index';
import Index from './pages/index';

export default function Routes() {
    return (
        <BrowserRouter>
            <Layout>
                <Route path="/index" component={Index} />
                <Route path="/tag" component={Index} />
            </Layout>
        </BrowserRouter>
    );
}
