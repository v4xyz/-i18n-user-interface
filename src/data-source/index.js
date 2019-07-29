const { createStore, combineReducers, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const logger = require('redux-logger').default;
const reducers = require('./reducers');
// redux中间件
const middleWares = [
	thunk,
	logger,
];
const store = createStore(combineReducers(reducers), applyMiddleware(...middleWares));
const { normalize, denormalize } = require('normalizr');
const { SCHEMAS, ACTIONS } = require('./actions');
const db = require('./warehouse-database');
const util = require('../util');

/**
 * 载入数据库数据
 * @return {[type]} [description]
 */
function loadDb() {

	db.load().then(() => {
		const langCodeData = db.model('LangCode').toArray();
		const langCode = normalize(langCodeData, [SCHEMAS.langCode]);	
		
		console.log('database loaded ...');
		store.dispatch(ACTIONS.loadDb({
			langCode
		}))
	});			
}

/**
 * 获取语种列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function getLangCodeList(params) {

	return new Promise((resolve, reject) => {

		const unsubscribe = store.subscribe(() => {
			const { langCode : { result, entities } } = store.getState()
			console.log(store.getState())
			resolve(util.formatListResp({
				list: denormalize(result, [SCHEMAS.langCode], entities),
				total: result.length,
				params,
			}));
			unsubscribe();
		});
		store.dispatch(ACTIONS.getLangCodeList(params));
	});
}

/**
 * 获取语种详情
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function getLangCodeDetail(params) {

	return new Promise((resolve, reject) => {

		const unsubscribe = store.subscribe(() => {
			const { langCode : { result, entities } } = store.getState()
			console.log(store.getState())
			resolve(entities.list[params.langCode] || {});
			unsubscribe();
		});
		store.dispatch(ACTIONS.getLangCodeDetail(params));
	});
}

/**
 * 新增语种
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function addLangCode(params) {

	return new Promise((resolve, reject) => {

		const unsubscribe = store.subscribe(() => {
			const { langCode : { result, entities } } = store.getState()
			console.log(store.getState())
			resolve(entities.list[params.langCode] || {});
			unsubscribe();
		});
		store.dispatch(ACTIONS.addLangCode(params));
	});
}

/**
 * 编辑语种
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function editLangCode(params) {

	return new Promise((resolve, reject) => {

		const unsubscribe = store.subscribe(() => {
			const { langCode : { result, entities } } = store.getState()
			console.log(store.getState())
			resolve(entities.list[params.langCode] || {});
			unsubscribe();
		});
		store.dispatch(ACTIONS.editLangCode(params));
	});
}

module.exports = {
	_store: store,
	loadDb,
	getLangCodeList,
	getLangCodeDetail,
	addLangCode,
	editLangCode,
};
