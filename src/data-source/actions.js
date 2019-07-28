const { normalize, schema } = require('normalizr');
const db = require('./warehouse-database');
const ACTION_TYPE = [
	'DATABASE_LOADED', // 数据库数据加载完成
	'GET_LANG_CODE_LIST', // 获取语言区域列表
].reduce((acc, item) => {
	acc[item] = item

	return acc
}, {});

const ACTIONS = {
	// 载入数据库数据
	loadDbData: () => {

		return (dispatch) => {

			db.load().then(() => {
				const langCodeData = db.model('LangCode').toArray();
				const schema_langCode = new schema.Entity('langCode', undefined, {idAttribute: 'langCode'});
				const normalizedData = normalize(langCodeData, [schema_langCode]);	
				
				console.log('database loaded ...');
				dispatch({
					type: ACTION_TYPE.DATABASE_LOADED,
					data: normalizedData
				})
			});		
		}
	},
	// langCode -> 列表
	getLangCodeList: (params) => {
		console.log(params)
		return {
			type: ACTION_TYPE.GET_LANG_CODE_LIST,
			params
		}
	},
}

module.exports = {
	ACTION_TYPE,
	ACTIONS,
};
