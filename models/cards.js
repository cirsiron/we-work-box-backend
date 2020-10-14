
const INDEX_NAME = 'cards'
const defaultData = require('./defaultData')
const { resetRes } = defaultData

module.exports = function (client) {
  return {
    async add (card = {}) {
      const { name, type, content } = card
      if (!name || !type || !content) {
        return {
          code: 1,
          message: '缺少参数',
          data: null
        }
      }
      let { message, code, data } = resetRes()
      try {
        await client.index({
          index: INDEX_NAME,
          body: {
            create_date: +new Date(),
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
        data = await client.update({
          index: INDEX_NAME,
          id,
          body: {
            doc: {
              modify_date: +new Date(),
              ...card
            }
          }
        })
      } catch (e) {
        message = e.message || '修改异常'
        code = 1
      }
      return {
        code,
        message,
        data: null
      }
    },
    async query (q) {
      let { message, code, data } = resetRes()
      try {
        if (q) {
          data = await client.search({
            index: INDEX_NAME,
            size: 30,
            q: `*${q}*`
          }, {
            ignore: [404],
            maxRetries: 2
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