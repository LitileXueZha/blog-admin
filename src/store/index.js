import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { todos } from './todo';

const reducers = combineReducers({todos});
const store = createStore(
    reducers,
    applyMiddleware(thunk),
);

export default store;
