const cardModels = require('../models')

const { add, remove, modify, query } = cardModels.cards

module.exports = {
  async add (card) {
    return await add(card)
  },
  async remove (id) {
    return await remove(id)
  },
  async modify (id, card) {
    return await modify(id, card)
  },
  async query (q) {
    return await query(q)
  }
}
