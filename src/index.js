import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';

import './index.less';
import store from './store';
import Routes from './Routes';

const theme = createMuiTheme({
    palette: {
        primary: teal,
        text: {
            primary: '#666',
            secondary: '#999',
            hint: '#999',
            disabled: '#999',
        },
        error: {
            main: '#f44336',
        },
    },
    typography: {
        fontFamily: 'PingFang SC, Microsoft YaHei, Arial',
    },
    overrides: {
        MuiTableCell: {
            head: {
                color: '#333',
                fontSize: '0.875rem',
                fontWeight: 500,
            },
        },
    },
});

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Routes />
        </ThemeProvider>
    </Provider>,
    document.getElementById('app'),
);
