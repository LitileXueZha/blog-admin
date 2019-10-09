import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { todos } from './todo';
import { article } from './article';
import { tag } from './tag';

let composeEnhancer = compose;
const reducers = combineReducers({
    todos,
    article,
    tag,
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
