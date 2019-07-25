const { ACTION_TYPE } = require('./actions');

const langCodeState = {
	list: [{a:1}, {a:2}]
};

function langCode(state = langCodeState, action) {
	return state
}

module.exports = {
	langCode,
};
