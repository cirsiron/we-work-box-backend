
console.log('process.env.API_HOST', process.env.API_HOST)
module.exports = {
  db: {
    HOST: process.env.API_HOST ? process.env.API_HOST : 'http://localhost',
    PORT: '9200',
    DATABASE: 'we-work-box',
    REQUEST_TIMEOUT: 2000 // 超时
  }
}
