'use strict'
const client = require('./init')
const cards = require('./cards')

module.exports = {
  cards: cards(client)
}
