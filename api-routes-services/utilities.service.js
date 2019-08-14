/**
 * Utilities Services is for common, simple & reusable methods,
 * @method {removenull} is for removing null key:value pair from the passed object
 * @method {sendmail} is for generating trasport and sending mail with specified mailOptions Object And returns a promise ex: { from:'', to:'',subject: '', html: '' }
 */

const nodemailer = require('nodemailer')
const config = require('../config')
const fs = require('fs')
const ejs = require('ejs')
const { status, messages } = require('../api.response')
const transporter = nodemailer.createTransport(config.MAIL_TRANSPORTER)
const errorLogs = fs.createWriteStream('error.log', { flags: 'a' })

const removenull = (obj) => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete obj[propName]
    }
  }
}

const sendmail = function (templateName, data, mailOption) {
  let template = fs.readFileSync(config.EMAIL_TEMPLATE_PATH + templateName, {
    encoding: 'utf-8' // Unicode Transformation Format (UTF).
  })

  let emailBody = ejs.render(template, data)

  mailOption.html = emailBody

  let nodeMailerOptions = mailOption
  return transporter.sendMail(nodeMailerOptions)
}

const catchError = (name, error, req, res) => {
  console.log(name, error)
  errorLogs.write(`${name} => ${new Date().toString()} => ${error.toString()}\r\n`)
  return res.status(status.InternalServerError).jsonp({ message: messages[req.userLanguage].error })
}

module.exports = {
  removenull,
  sendmail,
  catchError
}
