const { createStore, combineReducers, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const logger = require('redux-logger').default;
const reducers = require('./reducers');
// redux中间件
const middleWares = [
	thunk,
	// logger,
];
const store = createStore(combineReducers(reducers), applyMiddleware(...middleWares));

module.exports = store;
