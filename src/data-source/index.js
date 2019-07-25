const { createStore, combineReducers } = require('redux');
const reduxThunk = require('redux-thunk');
const reduxLogger = require('redux-logger');
const reducers = require('./reducers')

module.exports = createStore(combineReducers(reducers));