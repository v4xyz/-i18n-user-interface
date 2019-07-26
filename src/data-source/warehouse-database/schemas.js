module.exports = {
	LangCode: {
		langCode: {type: String, required: true}, // 语种编码 Language Code
		langArea: {type: String, required: true}, // 语种区域 Language Area
		referLang: {type: String, required: false, default: ''}, // 参考语言 Reference Language
		enbale: {type: Boolean, required: false, default: false},
		defaultLang: {type: Boolean, required: false, default: false}, // 默认语种 Default Language
	},
	LangCategory: {},
	LangItem: {},
	LangDict: {},
}
