const fs = require('fs');
const path = require('path');
const { db, DB_MODEL } = require('./index');
const rawFile = path.resolve(__dirname, 'i18n_item.txt'); // 源文件
const i18nCodes = ['zh_CN', 'zh_HK', 'en_US', 'ja'];
const i18nData = i18nCodes.reduce((acc, i18nCode) => {
	acc[i18nCode] = [];

	return acc;
}, {});
const langItems = [];

fs.readFile(rawFile, (err, data) => {
	// 文件内容按行切割
	const lines = data.toString().split('\n');

	lines.filter(line => line)
		.forEach((line, index) => {
			// 后台systype key验证			
			const sysTypeRule = /^<.+?>/
			const sysTypeKey = line.match(sysTypeRule) && line.match(sysTypeRule)[0]
			// i18n 词条
			const items = (sysTypeKey ? line.replace(sysTypeRule, 'SYSTYPEKEY') : line).replace(/(\n|\r)/g, '').split('_');

			// 兼容systype 的<>标记, eg: <PROCESS_CONF_GENERATION_MODE.1>_自动_自動_Auto
			let itemName = sysTypeKey ? sysTypeKey.replace(/[<>]/g, '') : items[0];
			const enName = items[3] && items[3].replace(/[\(\)]/g, ' ').trim().replace(/\s+/g, '.').toLowerCase();
			if (items[0] === 'page.cle.mchbill.detial.item') {
				itemName = itemName.replace('.item', `.${ enName }`);
			}
			i18nCodes.forEach((i18nCode, index) => {
						
				i18nData[i18nCode].push(`"${ itemName }": "${ items[index + 1] || items[3] }",`);
			});

			const prefixTypes =  ["APP-POPUP-", "APP-FIELD-", "APP-FIELD-ERROR-", "APP-AUTH-BTN-", "APP-MENU-", "PAGE-", "COMMON"];
			const category = prefixTypes.find(prefix => {
				return itemName.startsWith(prefix);
			});
			const moduleId = category === 'PAGE-' ? itemName.split('-')[1] : '';
			const pageId = category === 'PAGE-' ? itemName.split('-')[2] : '';

			langItems.push({
				itemId: itemName,
				category,
				moduleId,
				pageId,
				data: ['zh_CN', 'zh_HK', 'en_US'].reduce((acc, langCode, index) => {
					acc[langCode] = items[index+1] || items[1]

					return acc;
				}, {})
			});			
	});
	
	console.log(langItems);
	DB_MODEL['LangItem'].insert(langItems).then(data => {

		db.save();
	});
	// console.log(i18nData['zh_HK'].join('\n'))
	// i18nCodes.forEach(i18nCode => {
	// 	const t_filename = path.resolve(__dirname, '..', '..', 'src', 'language', 'target', `${i18nCode}.js`);
	// 	const endOfLine = '\r\n' //  require('os').EOL
	// 	const fileContent = `export default {${endOfLine}${ i18nData[i18nCode].join(endOfLine) }${endOfLine}};`

	// 	fs.writeFile(t_filename, fileContent, 'utf8', (err) => {
	// 		if (err) {
	// 			console.log(err);
	// 			return false;
	// 		}

	// 		console.log(t_filename, 'write ok ...')
	// 	});
	// });
});