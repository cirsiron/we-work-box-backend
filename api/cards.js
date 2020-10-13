const Router = require('@koa/router');
const cardControllers = require('../controllers')

const router = new Router({
  prefix: '/card'
});

const { add, remove, modify, query } = cardControllers.cards

router.post('/add', async (ctx) => {
  const res = await add({
    ...ctx.request.body
  })
  ctx.body = res
})
router.get('/remove', async (ctx) => {
  const { id } = ctx.request.query
  const res = await remove(id)
  ctx.body = res
})
router.get('/modify', async (ctx) => {
  const { id, card } = ctx.request.query
  const res = await modify(id, card)
  ctx.body = res
})
router.get('/query', async (ctx) => {
  const { q = '' } = ctx.request.query
  const res = await query(q)
  ctx.body = res
})

module.exports = router;

