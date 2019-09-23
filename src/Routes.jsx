import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Button, Dialog, AppBar, Toolbar, MenuList, MenuItem } from '@material-ui/core';

import Layout from './components/Layout/index';

export default function Routes() {
    return (
        <BrowserRouter>
            <Layout>
                <Button>
                    <i className="ion ion-ios-heart"></i>
                    <ion-icon name="ios-heart"></ion-icon>
                    heelo
                </Button>
            </Layout>
        </BrowserRouter>
    );
}
