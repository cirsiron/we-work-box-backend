const router = require('koa-router')();
const home = require('./home')
const users = require('./users')

// routes definition
router.use('/', home.routes(), home.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

module.exports = router;
