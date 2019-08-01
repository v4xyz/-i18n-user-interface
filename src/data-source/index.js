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

function commit2Store({params, action, storeName, onSuccess = () => {}, onError = () => {}}) {

	return new Promise((resolve, reject) => {

		const unsubscribe = store.subscribe(() => {
			try {
				const { [storeName] : { result, entities } } = store.getState()
				// console.log(store.getState())

				resolve(onSuccess({result, entities, params}));
				unsubscribe();
			} catch (e) {
				reject(onError(e));
				unsubscribe();
			}			
		});

		try { 
			store.dispatch(action(params));
		} catch (e) {
			reject(onError(e));
			unsubscribe();
		}
	});	
}

/***---语种 start---***/
/**
 * 获取语种列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function getLangCodeList(params) {
	const storeName = 'langCode';

	return commit2Store({
		params,
		action: ACTIONS.getLangCodeList,
		storeName,
		onSuccess: ({result, entities, params}) => {

			return util.formatListResp({
				list: denormalize(result, [SCHEMAS[storeName]], entities),
				total: result.length,
				params,
			})
		}
	});
}

/**
 * 获取语种详情
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function getLangCodeDetail(params) {
	const storeName = 'langCode';

	return commit2Store({
		params,
		action: ACTIONS.getLangCodeDetail,
		storeName,
		onSuccess: ({result, entities, params}) => {

			return entities.list[params.langCode] || {}
		}
	});	
}

/**
 * 新增语种
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function addLangCode(params) {
	const storeName = 'langCode';

	return commit2Store({
		params,
		action: ACTIONS.addLangCode,
		storeName,
		onSuccess: ({result, entities, params}) => {

			return entities.list[params.langCode] || {}
		}
	});		
}

/**
 * 编辑语种
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function editLangCode(params) {
	const storeName = 'langCode';

	return commit2Store({
		params,
		action: ACTIONS.editLangCode,
		storeName,
		onSuccess: ({result, entities, params}) => {

			return entities.list[params.langCode] || {}
		}
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
	const storeName = 'langCategory';

	return commit2Store({
		params,
		action: ACTIONS.getLangCategoryList,
		storeName,
		onSuccess: ({result, entities, params}) => {

			return util.formatListResp({
				list: denormalize(result, [SCHEMAS[storeName]], entities),
				total: result.length,
				params,
			})
		}
	});	
}

/**
 * 获取词条分类详情
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function getLangCategoryDetail(params) {
	const storeName = 'langCategory';

	return commit2Store({
		params,
		action: ACTIONS.getLangCategoryDetail,
		storeName,
		onSuccess: ({result, entities, params}) => {

			return entities.list[params.prefix] || {}
		}
	});		
}

/**
 * 新增词条分类
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function addLangCategory(params) {
	const storeName = 'langCategory';

	return commit2Store({
		params,
		action: ACTIONS.addLangCategory,
		storeName,
		onSuccess: ({result, entities, params}) => {

			return entities.list[params.prefix] || {}
		}
	});
}

/**
 * 编辑词条分类
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function editLangCategory(params) {
	const storeName = 'langCategory';

	return commit2Store({
		params,
		action: ACTIONS.editLangCategory,
		storeName,
		onSuccess: ({result, entities, params}) => {

			return entities.list[params.prefix] || {}
		}
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
	const storeName = 'langItem';

	return commit2Store({
		params,
		action: ACTIONS.getLangItemList,
		storeName,
		onSuccess: ({result, entities, params}) => {

			return util.formatListResp({
				list: denormalize(result, [SCHEMAS[storeName]], entities),
				total: result.length,
				params,
			})
		}
	});
}

/**
 * 获取i18n词条详情
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function getLangItemDetail(params) {
	const storeName = 'langItem';

	return commit2Store({
		params,
		action: ACTIONS.getLangItemDetail,
		storeName,
		onSuccess: ({result, entities, params}) => {

			return entities.list[params.itemId] || {}
		}
	});	
}

/**
 * 新增i18n词条
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function addLangItem(params) {
	const storeName = 'langItem';

	return commit2Store({
		params,
		action: ACTIONS.addLangItem,
		storeName,
		onSuccess: ({result, entities, params}) => {

			return entities.list[params.itemId] || {}
		}
	});		
}

/**
 * 编辑i18n词条
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function editLangItem(params) {
	const storeName = 'langItem';

	return commit2Store({
		params,
		action: ACTIONS.editLangItem,
		storeName,
		onSuccess: ({result, entities, params}) => {

			return entities.list[params.itemId] || {}
		}
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
