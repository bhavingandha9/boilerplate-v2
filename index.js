/**
 * node modules import.
 */
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const expressValidator = require('express-validator')
const mongoose = require('mongoose')
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')
const fs = require('fs')
const authService = require('./api-routes-services/auth.services')

/**
 * internal modules/files import
 */
const adminRoutes = require('./api-routes-services/admin.routes')
const config = require('./config')

/**
 * middlewares or confiurations
 */
const app = express()
const logFile = fs.createWriteStream('./access.log', { flags: 'a' })
const errorLogs = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' })

app.use(morgan(':remote-addr [:date[web]] :method :url :status - :response-time ms', { stream: logFile }))
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressValidator())
app.use((req, res, next) => {
  const expressJsonp = res.jsonp
  res.jsonp = function (body) {
    body.status = res.statusCode
    expressJsonp.call(this, body)
  }
  next()
})
app.set('view engine', 'ejs')
/**
 * mongoose connection (url from config/env)
 */
mongoose.connect(config.DB_URL, { promiseLibrary: global.Promise, useNewUrlParser: true })
  .then(() => console.log('Connected to database..'))
  .catch(error => {
    console.log('Connection to Database failed..')
    errorLogs.write(`${new Date().toString()} => ${error.toString()}\r\n`)
  })

// mongoose.set('debug', true)

/**
 * routes mapping
 */
app.use('/api/v1/admin', adminRoutes)
app.get('/user/reset/:sVerificationToken', authService.reset)
app.get('/user/linkTimeout', authService.linkTimeout)

app.get('/temp', (req, res) => {
  return res.status(404).jsonp({ message: 'success' })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/404.html'))
})
app.listen(config.PORT, () => {
  console.log('Magic happens on port :' + config.PORT)
})

module.exports = errorLogs
