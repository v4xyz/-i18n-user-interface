/**
 * 使用warehouse文件数据库, 进行数据持久化
 */
const path = require('path');
const Database = require('warehouse');
// const Model = require('warehouse/lib/model');
const Schema = Database.Schema;
const DB_PATH = path.join(__dirname, 'db-file.json');
const DB_VERSION = 1;
const schemas = require('./schemas');
const db = new Database({path: DB_PATH, version: DB_VERSION});
const langCatSchema = new Schema(schemas.LangCategory);
langCatSchema.virtual('id').get(function() {
	return `${this.itemId}-${this.langCode}`;
});
const DB_MODEL = {
	// 语种编码
	LangCode: db.model('LangCode', new Schema(schemas.LangCode)),
	LangCategory: db.model('LangCategory', langCatSchema),
	LangItem: db.model('LangItem', new Schema(schemas.LangItem)),	
};

module.exports = {
	db,
	DB_MODEL
};
