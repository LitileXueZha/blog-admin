import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import article from './article';
import tag from './tag';
import msg from './msg';
import comment from './comment';
import global, { logout } from './global';
import { setFetchStore } from '../utils/request';

let composeEnhancer = compose;
const reducers = combineReducers({
    global,
    article,
    tag,
    msg,
    comment,
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

// 设置请求 fetch 里的 store。
// 如果直接 import 此文件，将导致循环依赖的问题。
// FIXME: 思考更好的设计模式！
setFetchStore(store, { logout });

export default store;
