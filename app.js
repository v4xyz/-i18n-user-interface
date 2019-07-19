const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');

const Koa = require('koa');
const app = module.exports = new Koa();
const serverPort = 3300
// "database"

const posts = [];

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
  .post('/i18n/langCodeList', getLangCodeList)
  .post('/i18n/langDictList', getLangDictList)
  .post('/i18n/i8nItemList', getLangItemList)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create);

app.use(router.routes());

async function getLangCodeList(ctx) {

  ctx.body = JSON.stringify({
     "success":true,
     "obj":{
        "total":4,
        "pages":1,
        "rows":[
          {
             "langCode": "zh_CN",
             "langArea": "中文-简体"
          },
          {
             "langCode": "zh_HK",
             "langArea": "中文-繁體"
          },
          {
             "langCode": "en_US",
             "langArea": "English"
          },
          {
             "langCode": "ja",
             "langArea": "日本语"
          }
        ]
     }
  })
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

/**
 * Post listing.
 */

async function index(ctx) {  
  ctx.type = 'text/html; charset=utf-8';
  ctx.body = 'i18n service is running...'
}

/**
 * Show creation form.
 */

async function add(ctx) {
  ctx.redirect('/');
}


/**
 * Show post :id.
 */

async function show(ctx) {
  const id = ctx.params.id;
  const post = posts[id];
  if (!post) ctx.throw(404, 'invalid post id');
  // await ctx.render('show', { post: post });
}

/**
 * Create a post.
 */

async function create(ctx) {

  ctx.redirect('/');
}

// listen

if (!module.parent) {
  app.listen(serverPort);
  console.log('i18n service start at loacl port: ' + serverPort);
}
