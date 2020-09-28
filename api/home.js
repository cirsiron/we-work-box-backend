const router = require('koa-router')();

router.get('/', async function () {
  this.body = 'this is a users response!'
});

router.get('/bar', async function () {
  await (this.body = 'this is a users/bar response!')
});

module.exports = router;
