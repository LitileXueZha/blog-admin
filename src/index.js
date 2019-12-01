import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import 'moment/locale/zh-cn';

import './index.less';
import store from './store';
import Routes from './Routes';
import theme from './theme';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Routes />
        </ThemeProvider>
    </Provider>,
    document.getElementById('app'),
);
