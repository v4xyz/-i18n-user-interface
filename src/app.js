const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');
const Koa = require('koa');
const app = module.exports = new Koa();
const controller = require('./controller');
const serverPort = 3300;
// 载入数据库数据
controller.loadDb();
// middleware配置 start
// 记录日志
app.use(logger());
// 请求报文解析
app.use(koaBody());
// 设置默认响应报文为JSON, 响应报文格式也在这统一处理
app.use(async (ctx, next) => {

  await next();
  if (ctx.type === 'application/json') {
    ctx.type = 'application/json; charset=utf-8';
    const rows = ctx.body && ctx.body.rows;
    // 屏蔽_id等字段 
    if (Array.isArray(rows)) {
      ctx.body.rows = rows.map(item => {
        const newItem = { ...item };
        delete newItem._id;

        return newItem;
      })
    }
    ctx.body = {
       "success":true,
       "obj": ctx.body,
    };    
  }

});
// middleware配置 end

// route definitions
router.get('/', index)
  .post('/langCode/list', getLangCodeList)
  .get('/langCode/detail', getLangCodeDetail)
  .post('/langCode/add', addLangCode)
  .post('/langCode/edit', editLangCode)
  .post('/langCode/del', delLangCode)
  .post('/langCategory/list', getLangCategoryList)
  .get('/langCategory/detail', getLangCategoryDetail)
  .post('/langCategory/add', addLangCategory)
  .post('/langCategory/edit', editLangCategory)
  .post('/langCategory/del', delLangCategory)
  .post('/langItem/list', getLangItemList)
  .get('/langItem/detail', getLangItemDetail)
  .post('/langItem/add', addLangItem)
  .post('/langItem/edit', editLangItem)
  .post('/langItem/del', delLangItem)
  .get('/dist/:langCode.js', previewDist);

app.use(router.routes());

/***---语种 start---***/
async function getLangCodeList(ctx) {
  const params = ctx.request.body;

  ctx.body = await controller.getLangCodeList(params);
}

async function getLangCodeDetail(ctx) {
  const params = ctx.request.query;

  ctx.body = await controller.getLangCodeDetail(params);
}

async function addLangCode(ctx) {
  const params = ctx.request.body;

  ctx.body = await controller.addLangCode(params);
}

async function editLangCode(ctx) {
  const params = ctx.request.body;

  ctx.body = await controller.editLangCode(params);
}

async function delLangCode(ctx) {
  const params = ctx.req.query;

  ctx.body = await controller.delLangCode(params);
}
/***---语种   end---***/

/***---词条分类 start---***/
async function getLangCategoryList(ctx) {
  const params = ctx.request.body;

  ctx.body = await controller.getLangCategoryList(params);
}

async function getLangCategoryDetail(ctx) {
  const params = ctx.request.query;

  ctx.body = await controller.getLangCategoryDetail(params);
}

async function addLangCategory(ctx) {
  const params = ctx.request.body;

  ctx.body = await controller.addLangCategory(params);
}

async function editLangCategory(ctx) {
  const params = ctx.request.body;

  ctx.body = await controller.editLangCategory(params);
}

async function delLangCategory(ctx) {
  const params = ctx.req.query;

  ctx.body = await controller.delLangCategory(params);
}
/***---词条分类   end---***/

/***---i18n词条 start---***/
async function getLangItemList(ctx) {
  const params = ctx.request.body;

  ctx.body = await controller.getLangItemList(params);
}

async function getLangItemDetail(ctx) {
  const params = ctx.request.query;

  ctx.body = await controller.getLangItemDetail(params);
}

async function addLangItem(ctx) {
  const params = ctx.request.body;

  ctx.body = await controller.addLangItem(params);
}

async function editLangItem(ctx) {
  const params = ctx.request.body;

  ctx.body = await controller.editLangItem(params);
}

async function delLangItem(ctx) {
  const params = ctx.req.query;

  ctx.body = await controller.delLangItem();
}
/***---i18n词条   end---***/

/**
 * 预览国际化语言文件
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
async function previewDist(ctx, next) {

    const params = ctx.params;    
    ctx.type = 'application/javascript; charset=utf-8';
    ctx.body = await controller.previewDist(params);    
}

async function index(ctx) {  
  ctx.type = 'text/html; charset=utf-8';
  ctx.body = 'i18n service is running...'
}

// listen
if (!module.parent) {
  app.listen(serverPort);
  console.log('i18n service start at loacl port: ' + serverPort);
}
