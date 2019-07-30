const { normalize, schema } = require('normalizr');
const { db, DB_MODEL } = require('./warehouse-database');
const SCHEMAS = {
	langCode: new schema.Entity('list', undefined, {idAttribute: 'langCode'}),
	langCategory: new schema.Entity('list', undefined, {idAttribute: 'prefix'}),
	langItem: new schema.Entity('list', undefined),	
};
const ACTION_TYPE = [
	'DATABASE_LOADED',                 // 数据库数据加载完成
	'GET_LANG_CODE_LIST',              // 获取语种列表
	'GET_LANG_CODE_DETAIL',            // 获取语种详情
	'ADD_LANG_CODE',                   // 新增语种
	'UPDATE_LANG_CODE',                // 编辑语种
	'DELETE_LANG_CODE',                // 删除语种
	'ERROR_ADD_DUPLICATE_LANG_CODE',   // 不能新增重复的langCode
	'GET_LANG_CATEGORY_LIST',          // 获取语种分类列表
	'GET_LANG_CATEGORY_DETAIL',        // 获取语种分类详情
	'ADD_LANG_CATEGORY',               // 新增语种分类
	'UPDATE_LANG_CATEGORY',            // 编辑语种分类
	'DELETE_LANG_CATEGORY',            // 删除语种分类
	'GET_LANG_ITEM_LIST',              // 获取i18n词条列表
	'GET_LANG_ITEM_DETAIL',            // 获取i18n词条详情
	'ADD_LANG_ITEM',                   // 新增i18n词条
	'UPDATE_LANG_ITEM',                // 编辑i18n词条
	'DELETE_LANG_ITEM',                // 删除i18n词条	
].reduce((acc, item) => {
	acc[item] = item

	return acc
}, {});

const ACTIONS = {
	// 载入数据库数据
	loadDb: (params) => {

		return (dispatch) => {

			db.load().then(() => {
				const langCodeData = DB_MODEL['LangCode'].toArray();
				const langCategoryData = DB_MODEL['LangCategory'].toArray();
				const langItemData = DB_MODEL['LangItem'].toArray();
				const langCode = normalize(langCodeData, [SCHEMAS.langCode]);	
				const langCategory = normalize(langCodeData, [SCHEMAS.langCode]);	 
				const langItem = normalize(langCodeData, [SCHEMAS.langCode]);	 
				
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
			const { langCode: {entities, result} } = state;

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
			const { langCode: {result, entities} } = state;

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
}

module.exports = {
	SCHEMAS,
	ACTION_TYPE,
	ACTIONS,
};
