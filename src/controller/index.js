const { denormalize, schema } = require('normalizr');
const dataSource = require('../data-source');
const { SCHEMAS, ACTIONS, ACTION_TYPE } = require('../data-source/actions');
const listeners = [];
const unsubscribe = dataSource.subscribe(() => {
	const state = dataSource.getState();

	console.log('公共监听器已经触发...');
});

// 载入数据库文件
function loadDb() {
	
	dataSource.dispatch(ACTIONS.loadDbData())
}

// 获取语种列表
function getLangCodeList(params) {

	return new Promise((resolve, reject) => {

		const unsubscribe = dataSource.subscribe(() => {
			const { langCode : { result, entities } } = dataSource.getState()
			console.log(dataSource.getState())
			resolve(denormalize(result, [SCHEMAS.langCode], entities));
			// resolve(dataSource.getState());
			unsubscribe();
		});
		dataSource.dispatch(ACTIONS.getLangCodeList(params));
	});
}

module.exports = {
	loadDb,
	getLangCodeList,
}
