const dataSource = require('../data-source');
const { ACTIONS, ACTION_TYPE } = require('../data-source/actions');
const listeners = [];
const unsubscribe = dataSource.subscribe(() => {
	const state = dataSource.getState();

	listeners
		.filter(listener => !listener.invoked)
		.forEach(listener => {

			listener(state)
			listener.invoked = true
		});

});

// 载入数据库文件
function loadDb() {
	
	dataSource.dispatch(ACTIONS.loadDbData())
}

// 获取语种列表
function getLangCodeList(params) {

	return new Promise((resolve, reject) => {		
		listeners.push(resolve);
		console.log(listeners.filter(listener => !listener.invoked).length)
		dataSource.dispatch(ACTIONS.getLangCodeList(params));
		// resolve(dataSource.getState());
	});
}

module.exports = {
	loadDb,
	getLangCodeList,
}
