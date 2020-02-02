const redis = require('redis')
const util = require('util')
const config = require('../config')
const redisClient = redis.createClient({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT
})
redisClient.on('error', function (error) {
  console.log('Error in Redis', error)
  // process.exit(1)
})
redisClient.on('connect', function () {
  console.log('redis connected')
})
redisClient.hget = util.promisify(redisClient.hget)
redisClient.hset = util.promisify(redisClient.hset)

redisClient.get = util.promisify(redisClient.get)
redisClient.set = util.promisify(redisClient.set)

redisClient.rpush = util.promisify(redisClient.rpush)
redisClient.blpop = util.promisify(redisClient.blpop)
redisClient.lpop = util.promisify(redisClient.lpop)

const queuePush = (queueName, data) => {
  return redisClient.rpush(queueName, JSON.stringify(data))
}

const queuePop = (queueName) => {
  return redisClient.lpop(queueName, 1)
}

module.exports = {
  queuePush,
  queuePop
}
