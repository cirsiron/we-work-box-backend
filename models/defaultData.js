const models = require(".");
// 默认返回的数据
const resetRes = () => {
  return {
    code: 0,
    message: 'ok',
    data: null
  }
}

module.exports = {
  resetRes
}
