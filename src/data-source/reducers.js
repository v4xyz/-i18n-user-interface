const { ACTION_TYPE } = require('./actions');

// 语种
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
						[updatedId]: {...action.params}
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

// 词条分类
function langCategory(state = {}, action) {
	const keyField = 'prefix';
	const actions = {
		[ACTION_TYPE.DATABASE_LOADED]: () => {
			return action.params.langCategory;
		},
		[ACTION_TYPE.GET_LANG_CATEGORY_LIST]: () => {
			return state;
		},
		[ACTION_TYPE.GET_LANG_CATEGORY_DETAIL]: () => {
			return state;
		},
		[ACTION_TYPE.ADD_LANG_CATEGORY]: () => {
			const updatedId = action.params[keyField];

			return {
				...state,
				entities: {
					...state.entities,
					list: {
						...state.entities.list,
						[updatedId]: {...action.params}
					}
				},
				result: [...state.result, updatedId],
			};
		},
		[ACTION_TYPE.UPDATE_LANG_CATEGORY]: () => {
			const updatedId = action.params[keyField];
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
		[ACTION_TYPE.DEL_LANG_CATEGORY]: () => {
			return state;
		},		
		default: () => {
			return state
		}
	}

	return (actions[action.type] || actions['default'])()	
}

// i18n词条
function langItem(state = {}, action) {
	const actions = {
		[ACTION_TYPE.DATABASE_LOADED]: () => {
			return action.params.langItem;
		},
		[ACTION_TYPE.GET_LANG_ITEM_LIST]: () => {
			return state;
		},
		[ACTION_TYPE.GET_LANG_ITEM_DETAIL]: () => {
			return state;
		},
		[ACTION_TYPE.ADD_LANG_ITEM]: () => {
			const updatedId = action.params.langItem

			return {
				...state,
				entities: {
					...state.entities,
					list: {
						...state.entities.list,
						[updatedId]: {...action.params}
					}
				},
				result: [...state.result, updatedId],
			};
		},
		[ACTION_TYPE.UPDATE_LANG_ITEM]: () => {
			const updatedId = action.params.langItem
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
		[ACTION_TYPE.DEL_LANG_ITEM]: () => {
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
	langCategory,
	langItem,
};
