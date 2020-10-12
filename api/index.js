const Router = require('@koa/router');
const router = new Router();
const cards = require('./cards');

// routes definition
router.use('/api', cards.routes(), cards.allowedMethods());
module.exports = router;
