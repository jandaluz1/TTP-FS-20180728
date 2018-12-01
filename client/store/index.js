import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import user from './user';

const reducer = combineReducers({ user });

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
