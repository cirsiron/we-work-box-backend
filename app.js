const Koa = require('koa')
const logger = require('koa-logger')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const routers = require('./api')

const app = new Koa();
// error handler
onerror(app);

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(bodyParser());
app.use(json());
app.use(logger());

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});
// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
