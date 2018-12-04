import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import user from './user';
import order from './order';
import portfolio from './stocks';

const reducer = combineReducers({ user, order, portfolio });

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
