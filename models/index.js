'use strict'
const { Client } = require('elasticsearch')
const { db } = require('../config')

const { HOST, PORT, REQUEST_TIMEOUT } = db
const client = new Client({
  hosts: [ `${HOST}:${PORT}`]
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
  console.log('Everything is ok');
  console.log('===================================');
})

module.exports = client
