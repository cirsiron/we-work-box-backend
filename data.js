'use strict'
const { Client } = require('elasticsearch')
const client = new Client({
  hosts: [ 'http://localhost:9200']
})

client.ping({
  requestTimeout: 20000
}, function(err) {
  if (err) {
    console.error('elasticsearch cluster is down!');
    console.log('===================================');
    return
  }
  console.log('Everything is ok');
})


client.search({index:'demo',  q: '日子'})
.then((res) => {
  console.log(res.hits.hits)
}).catch((err) => {
  console.log(err)
})
