import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import { ThemeProvider } from '@material-ui/styles';

import './index.less';
import store from './store';
import Routes from './Routes';
import theme from './theme';

moment.locale('zh-cn');

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Routes />
        </ThemeProvider>
    </Provider>,
    document.getElementById('app'),
);
