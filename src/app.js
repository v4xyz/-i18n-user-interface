const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');
const Koa = require('koa');
const app = module.exports = new Koa();
const controller = require('./controller');
const serverPort = 3300;

controller.loadDb();
// middleware
// 记录日志
app.use(logger());
// 请求报文解析
app.use(koaBody());
// 设置默认响应报文为JSON
app.use(async (ctx, next) => {

  await next();
  ctx.type = 'application/json; charset=utf-8';
});

// route definitions

router.get('/', index)
  .post('/langCodeList', getLangCodeList)
  .post('/langDictList', getLangDictList)
  .post('/i8nItemList', getLangItemList);

app.use(router.routes());

async function getLangCodeList(ctx) {
  const params = ctx.request.body;

  ctx.body = await controller.getLangCodeList(params);
}

async function getLangDictList(ctx) {

  ctx.body = JSON.stringify({
     "success":true,
     "obj":{
        "total":0,
        "pages":0,
        "rows":[
        ]
     }
  })
}

async function getLangItemList(ctx) {

  ctx.body = JSON.stringify({
     "success":true,
     "obj":{
        "total":0,
        "pages":0,
        "rows":[
        ]
     }
  })
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
