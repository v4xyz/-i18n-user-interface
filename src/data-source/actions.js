const { normalize, schema } = require('normalizr');
const db = require('./warehouse-database');
const SCHEMAS = {
	langCode: new schema.Entity('list', undefined, {idAttribute: 'langCode'}),
};
const ACTION_TYPE = [
	'DATABASE_LOADED',            // 数据库数据加载完成
	'GET_LANG_CODE_LIST',         // 获取语种详情列表
	'GET_LANG_CODE_DETAIL',       // 获取语种详情
	'ADD_LANG_CODE',       // 新增辑语种详情
	'UPDATE_LANG_CODE',    // 编辑语种详情
	'DELETE_LANG_CODE',    // 删除语种详情
].reduce((acc, item) => {
	acc[item] = item

	return acc
}, {});

const ACTIONS = {
	// 载入数据库数据
	loadDb: (params) => {

		return {
			type: ACTION_TYPE.DATABASE_LOADED,
			params
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

		return {
			type: ACTION_TYPE.ADD_LANG_CODE,
			params
		};	
	},	
	// 编辑语种
	editLangCode: (params) => {

		return {
			type: ACTION_TYPE.UPDATE_LANG_CODE,
			params
		};	
	},
}

module.exports = {
	SCHEMAS,
	ACTION_TYPE,
	ACTIONS,
};
