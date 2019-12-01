import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import article from './article';
import tag from './tag';
import msg from './msg';

let composeEnhancer = compose;
const reducers = combineReducers({
    article,
    tag,
    msg,
});

// 非生产环境添加 redux-devtools-extension
if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const store = createStore(
    reducers,
    composeEnhancer(applyMiddleware(thunk)),
);

export default store;
