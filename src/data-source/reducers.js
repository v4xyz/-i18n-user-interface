const { ACTION_TYPE } = require('./actions');

function langCode(state = {}, action) {
	const actions = {
		[ACTION_TYPE.DATABASE_LOADED]: () => {
			return action.data
		},
		default: () => {
			return state
		}
	}

	return (actions[action.type] || actions['default'])()
}

module.exports = {
	langCode,
};
