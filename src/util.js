/**
 * 格式化list响应数据
 * @param  {[type]} options.list      [description]
 * @param  {[type]} options.total     [description]
 * @param  {[type]} options.pageIndex [description]
 * @return {[type]}                   [description]
 */
function formatListResp({list, total, params}) {

	return  {
		rows: list,
		total,
		pageIndex: params.page,
	}
}

module.exports = {
	formatListResp,
};
