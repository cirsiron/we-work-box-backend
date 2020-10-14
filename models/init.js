'use strict'
const { Client } = require('@elastic/elasticsearch')
const { db, requestTimeout } = require('../config')

const { HOST, PORT } = db
const client = new Client({
  node: `${HOST}:${PORT}`
})

client.ping({
  requestTimeout
}, function(err) {
  if (err) {
    console.log('===================================');
    console.error('elasticsearch cluster is down!');
    console.log('===================================');
    return
  }
  console.log('===================================');
  console.log('elasticsearch is ok');
  console.log('===================================');
})

module.exports = client
