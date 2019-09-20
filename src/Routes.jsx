import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Button, Dialog, AppBar, Toolbar } from '@material-ui/core';

export default function Routes() {
    return (
        <BrowserRouter>
            <AppBar>
                <Toolbar>
                    <img src={require('../src/assets/images/logo.jpg')} alt="logo" srcset=""/>
                    dasf
                </Toolbar>
            </AppBar>
            <Button>
                <i className="ion ion-ios-heart"></i>
                <ion-icon name="ios-heart"></ion-icon>
                heelo
            </Button>
        </BrowserRouter>
    );
}
