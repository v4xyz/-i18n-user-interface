/**
 * warehouse数据库使用的schema定义
 * @type {Object}
 */
module.exports = {
	// 语种
	LangCode: {
		langCode: {type: String, required: true}, // 语种编码 Language Code
		langArea: {type: String, required: true}, // 语种区域 Language Area
		referLang: {type: String, required: false, default: ''}, // 参考语言 Reference Language
		enable: {type: Boolean, required: false, default: false},
		defaultLang: {type: Boolean, required: false, default: false}, // 默认语种 Default Language
	},
	// 词条分类
	LangCategory: {
		name: {type: String, required: true},
		prefix: {type: String, required: false},
		itemId: {type: String, required: false, default: ''},
	},
	// i18n词条
	LangItem: {		
		itemId: {type: String, required: true},
		data: {type: Object, required: false},
		category: {type: String, required: false},
		moduleId: {type: String, required: false},
		pageId: {type: String, required: false},
		alias: {type: String, required: false},
	},
	// 术语词典
	LangDict: {},
}
