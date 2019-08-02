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
const pageParams = { page: 1, limit: 10 };
/**
 * 载入数据库数据
 * @return {[type]} [description]
 */
function loadDb() {

	store.dispatch(ACTIONS.loadDb());		
}

/**
 * 触发action到store获取最新的state
 * @param  {[type]}   options.params    [description]
 * @param  {[type]}   options.action    [description]
 * @param  {[type]}   options.storeName [description]
 * @param  {Function} options.onSuccess [description]
 * @param  {Function} onError           [description]
 * @return {[type]}                     [description]
 */
function commit2Store({params, action, storeName, onSuccess = () => {}, onError = () => {}}) {

	return new Promise((resolve, reject) => {

		const unsubscribe = store.subscribe(() => {
			try {
				const { [storeName] : { result, entities } } = store.getState()
				// console.log(store.getState())

				resolve(onSuccess({result, entities, params}));
				unsubscribe();
			} catch (e) {
				console.log(e)
				reject(onError(e));
				unsubscribe();
			}			
		});

		try { 
			store.dispatch(action(params));
		} catch (e) {
			console.log(e)
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
function getLangItemList(params = pageParams) {
	const storeName = 'langItem';

	return commit2Store({
		params,
		action: ACTIONS.getLangItemList,
		storeName,
		onSuccess: ({result, entities, params}) => {
			const { page, limit, itemId = '', category = '', moduleId = '', pageId = '' } = params;
			const langItems =  denormalize(result, [SCHEMAS[storeName]], entities)
								.filter(item => {
									// 按itemId查找
									return item.itemId.startsWith(itemId);
								})
								.filter(item => {
									// 按category查找
									return (item.category || '').startsWith(category);
								})
								.filter(item => {
									// 按moduleId查找
									return (item.moduleId || '').startsWith(moduleId);
								})
								.filter(item => {
									// 按pageId查找
									return (item.pageId || '').startsWith(pageId);
								})
			const total = langItems.length;
			const validPage = page < 1 ? 0 : (page > Math.floor(total/limit) ? Math.floor(total/limit) : page - 1);

			return util.formatListResp({
				list: langItems.slice(validPage * limit, (validPage + 1) * limit),
				total,
				params: {
					page: validPage,
				},
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

function previewDist(params) {
	const storeName = 'langItem';

	return commit2Store({
		params,
		action: ACTIONS.previewDist,
		storeName,
		onSuccess: ({result, entities, params}) => {
			const { langCode } = params;
			const langItems = util.formatListResp({
				list: denormalize(result, [SCHEMAS[storeName]], entities),
				total: result.length,
				params,
			});

			return `export default {\r\n${ 
				langItems.rows.map(langItem => {
						const { itemId, data } = langItem;

						return `    "${ itemId }": "${ data[langCode] }",`
				}).join('\r\n') }\r\n};\r\n`
		}
	});	
}

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
	previewDist,
};
