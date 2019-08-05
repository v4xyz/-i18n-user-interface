const { normalize, schema } = require('normalizr');
const { db, DB_MODEL } = require('./warehouse-database');
const SCHEMAS = {
	langCode: new schema.Entity('list', undefined, { idAttribute: 'langCode' }),
	langCategory: new schema.Entity('list', undefined, { idAttribute: 'prefix' }),
	langItem: new schema.Entity('list', undefined, { idAttribute: 'itemId' }),
};
const ACTION_TYPE = [
	'DATABASE_LOADED', // 数据库数据加载完成
	'GET_LANG_CODE_LIST', // 获取语种列表
	'GET_LANG_CODE_DETAIL', // 获取语种详情
	'ADD_LANG_CODE', // 新增语种
	'UPDATE_LANG_CODE', // 编辑语种
	'DELETE_LANG_CODE', // 删除语种
	'ERROR_ADD_DUPLICATE_LANG_CODE', // 不能新增重复的langCode
	'GET_LANG_CATEGORY_LIST', // 获取语种分类列表
	'GET_LANG_CATEGORY_DETAIL', // 获取语种分类详情
	'ADD_LANG_CATEGORY', // 新增语种分类
	'UPDATE_LANG_CATEGORY', // 编辑语种分类
	'DELETE_LANG_CATEGORY', // 删除语种分类
	'GET_LANG_ITEM_LIST', // 获取i18n词条列表
	'GET_LANG_ITEM_DETAIL', // 获取i18n词条详情
	'ADD_LANG_ITEM', // 新增i18n词条
	'BATCH_ADD_LANG_ITEM', // 批量新增i18n词条
	'UPDATE_LANG_ITEM', // 编辑i18n词条
	'DELETE_LANG_ITEM', // 删除i18n词条
	'PREVIEW_I18N_FILE', // 预览国际化语言文件
	'EXPORT_RAW', // 导出原始文件
	'ERROR_ADD_DUPLICATE_LANG_ITEM', // 已存在相同的词条
].reduce((acc, item) => {
	acc[item] = item

	return acc
}, {});

/**
 * 处理词条报文
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function hanleLangItems(params) {
	const { category, moduleId, pageId } = params;
	const langItems = params.langItems.map((item) => {
		const { itemId } = item;
		delete item.itemId;
		const langCodes = Object.keys(item);
		const data = langCodes.reduce((acc, langCode) => {
			acc[langCode] = item[langCode];

			return acc;
		}, {});

		return {				
			itemId,
			category,
			moduleId: category === 'PAGE-' ? moduleId : '',
			pageId: category === 'PAGE-' ? pageId : '',
			data,
		};
	});

	return langItems
}

const ACTIONS = {
	// 载入数据库数据
	loadDb: (params) => {

		return (dispatch) => {

			db.load().then(() => {
				const langCodeData = DB_MODEL['LangCode'].toArray();
				const langCategoryData = DB_MODEL['LangCategory'].toArray();
				const langItemData = DB_MODEL['LangItem'].toArray();
				const langCode = normalize(langCodeData, [SCHEMAS.langCode]);
				const langCategory = normalize(langCategoryData, [SCHEMAS.langCategory]);
				const langItem = normalize(langItemData, [SCHEMAS.langItem]);

				console.log('database loaded ...');
				dispatch({
					type: ACTION_TYPE.DATABASE_LOADED,
					params: {
						langCode,
						langCategory,
						langItem,
					},
				})
			});
		};
	},
	// 获取语种列表
	getLangCodeList: (params) => {

		return {
			type: ACTION_TYPE.GET_LANG_CODE_LIST,
			params
		};
	},
	// 获取语种详情
	getLangCodeDetail: (params) => {

		return {
			type: ACTION_TYPE.GET_LANG_CODE_DETAIL,
			params
		};
	},
	// 新增语种
	addLangCode: (params) => {

		return (dispatch, getState) => {
			const state = getState();
			const { langCode: { entities, result } } = state;

			if (result.includes(params.langCode)) {
				// 不能新增重复的langCode
				dispatch({
					type: ACTION_TYPE.ERROR_ADD_DUPLICATE_LANG_CODE,
					params
				});
			} else {
				DB_MODEL['LangCode'].insert(params)
					.then(data => {
						// 更新数据库存储
						db.save();
					});

				dispatch({
					type: ACTION_TYPE.ADD_LANG_CODE,
					params
				});
			}
		};
	},
	// 编辑语种
	editLangCode: (params) => {

		return (dispatch, getState) => {
			const state = getState();
			const { langCode: { result, entities } } = state;

			DB_MODEL['LangCode'].updateById(entities.list[params.langCode]._id, params)
				.then(data => {
					// 更新数据库存储
					db.save();
				});

			dispatch({
				type: ACTION_TYPE.UPDATE_LANG_CODE,
				params
			})
		};
	},
	// 删除语种
	delLangCode: (params) => {

		return (dispatch, getState) => {
			const state = getState();
			const { langCode: { result, entities } } = state;

			dispatch({
				type: ACTION_TYPE.DELETE_LANG_CODE,
				params
			})
		};
	},
	// 获取词条分类列表
	getLangCategoryList: (params) => {

		return {
			type: ACTION_TYPE.GET_LANG_CATEGORY_LIST,
			params
		};
	},
	// 获取词条分类详情
	getLangCategoryDetail: (params) => {

		return {
			type: ACTION_TYPE.GET_LANG_CATEGORY_DETAIL,
			params
		};
	},
	// 新增词条分类
	addLangCategory: (params) => {

		return (dispatch, getState) => {
			const state = getState();
			const { langCategory: { entities, result } } = state;

			if (result.includes(params.langCategory)) {
				// 不能新增重复的langCategory
				dispatch({
					type: ACTION_TYPE.ERROR_ADD_DUPLICATE_LANG_CATEGORY,
					params
				});
			} else {
				DB_MODEL['LangCategory'].insert(params)
					.then(data => {
						// 更新数据库存储
						db.save();
					});

				dispatch({
					type: ACTION_TYPE.ADD_LANG_CATEGORY,
					params
				});
			}
		};
	},
	// 编辑词条分类
	editLangCategory: (params) => {

		return (dispatch, getState) => {
			const state = getState();
			const { langCategory: { result, entities } } = state;

			DB_MODEL['LangCategory'].updateById(entities.list[params.prefix]._id, params)
				.then(data => {
					// 更新数据库存储
					db.save();
				});

			dispatch({
				type: ACTION_TYPE.UPDATE_LANG_CATEGORY,
				params
			})
		};
	},
	// 删除词条分类
	delLangCategory: (params) => {

		return (dispatch, getState) => {
			const state = getState();
			const { langCategory: { result, entities } } = state;

			dispatch({
				type: ACTION_TYPE.DELETE_LANG_CATEGORY,
				params
			})
		};
	},
	// 获取i18词条列表
	getLangItemList: (params) => {

		return {
			type: ACTION_TYPE.GET_LANG_ITEM_LIST,
			params
		};
	},
	// 获取i18词条详情
	getLangItemDetail: (params) => {

		return {
			type: ACTION_TYPE.GET_LANG_ITEM_DETAIL,
			params
		};
	},
	// 新增i18词条
	addLangItem: (params) => {
		const langItems = hanleLangItems(params);

		return (dispatch, getState) => {
			const state = getState();
			const { langItem: { entities, result } } = state;
			const existingdKeys = langItems.filter(item => {
				const { itemId } = item;

				return result.find(id => id === itemId)
			}).map(item => item.itemId);

			if (existingdKeys.length > 0) {
				const executedParams = {
					type: ACTION_TYPE.ERROR_ADD_DUPLICATE_LANG_ITEM,
					params: {
						err: {existingdKeys}
					}
				};
				// 不能新增重复的langItem
				dispatch(executedParams);
				// 不用例会store变化 直接处理业务错误
				throw executedParams;
			} else {
				// DB_MODEL['LangItem'].insert(langItems)
				// 	.then(data => {
				// 		// 更新数据库存储
				// 		db.save();
				// 	});

				dispatch({
					type: ACTION_TYPE.BATCH_ADD_LANG_ITEM,
					params: {
						langItems
					}
				});
			}
		};
	},
	// 编辑i18词条
	editLangItem: (params) => {
		const langItems = hanleLangItems(params);
		
		return (dispatch, getState) => {
			const state = getState();
			const { langItem: { result, entities } } = state;

			DB_MODEL['LangCode'].updateById(entities.list[params.itemId]._id, langItems[0])
				.then(data => {
					// 更新数据库存储
					db.save();
				});

			dispatch({
				type: ACTION_TYPE.UPDATE_LANG_ITEM,
				params: langItems[0],
			})
		};
	},
	// 删除i18词条
	delLangItem: (params) => {

		return (dispatch, getState) => {
			const state = getState();
			const { langItem: { result, entities } } = state;

			dispatch({
				type: ACTION_TYPE.DELETE_LANG_ITEM,
				params
			})
		};
	},
	// 预览输出文件
	previewDist: (params) => {		

		return {
			type: ACTION_TYPE.PREVIEW_I18N_FILE,
			params,
		}
	},
	exportRaw: (params) => {

		return {
			type: ACTION_TYPE.EXPORT_RAW,
			params,			
		}
	}
}

module.exports = {
	SCHEMAS,
	ACTION_TYPE,
	ACTIONS,
};
