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
const util = require('../util');

/**
 * 载入数据库数据
 * @return {[type]} [description]
 */
function loadDb() {

	store.dispatch(ACTIONS.loadDb());		
}

/***---语种 start---***/
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

/**
 * 编辑语种
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function delLangCode(params) {

	return {};
}
/***---语种   end---***/

/***---词条分类 start---***/
/**
 * 获取词条分类列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function getLangCategoryList(params) {

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
		store.dispatch(ACTIONS.getLangCategoryList(params));
	});
}

/**
 * 获取词条分类详情
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function getLangCategoryDetail(params) {

	return new Promise((resolve, reject) => {

		const unsubscribe = store.subscribe(() => {
			const { langCode : { result, entities } } = store.getState()
			console.log(store.getState())
			resolve(entities.list[params.langCode] || {});
			unsubscribe();
		});
		store.dispatch(ACTIONS.getLangCategoryDetail(params));
	});
}

/**
 * 新增词条分类
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function addLangCategory(params) {

	return new Promise((resolve, reject) => {

		const unsubscribe = store.subscribe(() => {
			const { langCode : { result, entities } } = store.getState()
			console.log(store.getState())
			resolve(entities.list[params.langCode] || {});
			unsubscribe();
		});
		store.dispatch(ACTIONS.addLangCategory(params));
	});
}

/**
 * 编辑词条分类
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function editLangCategory(params) {

	return new Promise((resolve, reject) => {

		const unsubscribe = store.subscribe(() => {
			const { langCode : { result, entities } } = store.getState()
			console.log(store.getState())
			resolve(entities.list[params.langCode] || {});
			unsubscribe();
		});
		store.dispatch(ACTIONS.editLangCategory(params));
	});
}

/**
 * 编辑词条分类
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function delLangCategory(params) {

	return {};
}
/***---词条分类   end---***/

/***---i18词条 start---***/
/**
 * 获取i18n词条列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function getLangItemList(params) {

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
		store.dispatch(ACTIONS.getLangItemList(params));
	});
}

/**
 * 获取i18n词条详情
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function getLangItemDetail(params) {

	return new Promise((resolve, reject) => {

		const unsubscribe = store.subscribe(() => {
			const { langCode : { result, entities } } = store.getState()
			console.log(store.getState())
			resolve(entities.list[params.langCode] || {});
			unsubscribe();
		});
		store.dispatch(ACTIONS.getLangItemDetail(params));
	});
}

/**
 * 新增i18n词条
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function addLangItem(params) {

	return new Promise((resolve, reject) => {

		const unsubscribe = store.subscribe(() => {
			const { langCode : { result, entities } } = store.getState()
			console.log(store.getState())
			resolve(entities.list[params.langCode] || {});
			unsubscribe();
		});
		store.dispatch(ACTIONS.addLangItem(params));
	});
}

/**
 * 编辑i18n词条
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function editLangItem(params) {

	return new Promise((resolve, reject) => {

		const unsubscribe = store.subscribe(() => {
			const { langCode : { result, entities } } = store.getState()
			console.log(store.getState())
			resolve(entities.list[params.langCode] || {});
			unsubscribe();
		});
		store.dispatch(ACTIONS.editLangItem(params));
	});
}

/**
 * 编辑i18n词条
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function delLangItem(params) {

	return {};
}
/***---i18词条   end---***/

module.exports = {
	_store: store,
	loadDb,
	getLangCodeList,
	getLangCodeDetail,
	addLangCode,
	editLangCode,
	delLangCode,
	getLangCategoryList,
	getLangCategoryDetail,
	addLangCategory,
	editLangCategory,
	delLangCategory,
	getLangItemList,
	getLangItemDetail,
	addLangItem,
	editLangItem,
	delLangItem,		
};
