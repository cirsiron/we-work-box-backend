
const INDEX_NAME = 'cards'
const defaultData = require('./defaultData')
const { resetRes } = defaultData

module.exports = function (client) {
  return {
    async add (card = {}) {
      let { message, code, data } = resetRes()
      try {
        await client.index({
          index: INDEX_NAME,
          body: {
            ...card
          }
        })
      } catch (e) {
        console.warn('错误：', e)
        message = e.message || '添加异常'
        code = 1
      }
      return {
        code,
        message,
        data: (data && data.body) ? data.body.hits.hits : null
      }
    },
    async remove (id) {
      let { message, code, data } = resetRes()
      try {
        data = client.delete({
          index: INDEX_NAME,
          refresh: 'true',
          id
        })
      } catch (e) {
        message = e.message || '删除异常'
        code = 1
      }
      return {
        code,
        message,
        data: (data && data.body) ? data.body.hits.hits : null
      }
    },
    async modify (id, card = {}) {
      let { message, code, data } = resetRes()
      try {
        data = await client.index({
          index: INDEX_NAME,
          id,
          body: {
            ...card
          }
        })
      } catch (e) {
        message = e.message || '修改异常'
        code = 1
      }
      return {
        code,
        message,
        data: (data && data.body) ? data.body.hits.hits : null
      }
    },
    async query (q) {
      let { message, code, data } = resetRes()
      try {
        if (q) {
          data = await client.search({
            index: INDEX_NAME,
            size: 30,
            q
          })
        } else {
          data = await client.search({
            index: INDEX_NAME,
            size: 30
          })
        }
      } catch (e) {
        message = e.message || '查询异常'
        code = 1
      }
      return {
        code,
        message,
        data: (data && data.body) ? data.body.hits.hits : null
      }
    }
  }
}