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
