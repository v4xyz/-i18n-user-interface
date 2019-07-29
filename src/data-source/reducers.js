const { ACTION_TYPE } = require('./actions');

function langCode(state = {}, action) {
	const actions = {
		[ACTION_TYPE.DATABASE_LOADED]: () => {
			return action.params.langCode;
		},
		[ACTION_TYPE.GET_LANG_CODE_LIST]: () => {
			return state;
		},
		[ACTION_TYPE.GET_LANG_CODE_DETAIL]: () => {
			return state;
		},
		[ACTION_TYPE.ADD_LANG_CODE]: () => {
			const updatedId = action.params.langCode

			return {
				...state,
				entities: {
					...state.entities,
					list: {
						...state.entities.list,
						[updatedId]: {...updatedItem, ...action.params}
					}
				},
				result: [...state.result, updatedId],
			};
		},
		[ACTION_TYPE.UPDATE_LANG_CODE]: () => {
			const updatedId = action.params.langCode
			const updatedItem = state.entities.list[updatedId];

			return {
				...state,
					entities: {
						...state.entities,
						list: {
							...state.entities.list,
							[updatedId]: {...updatedItem, ...action.params}
						}
					},
			};
		},
		[ACTION_TYPE.DEL_LANG_CODE]: () => {
			return state;
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
