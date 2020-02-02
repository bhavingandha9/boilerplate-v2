const SettingsModel = require('../models/settings.model')
const { catchError } = require('./utilities.service')
const { messages, status } = require('../api.response')

// to create a new setting
const store = async (req, res) => {
  try {
    req.checkBody('sKey', messages[req.userLanguage].req_sKey).notEmpty()
    req.checkBody('sValue', messages[req.userLanguage].req_sValue).notEmpty()
    let result = await req.getValidationResult()
    if (!result.isEmpty()) return res.status(status.BadRequest).jsonp({ message: result.array() })

    let newSettings = new SettingsModel({
      sKey: req.body.sKey,
      sValue: req.body.sValue,
      dCreatedAt: Date.now()
    })

    return res.status(status.OK).jsonp({
      message: messages[req.userLanguage].success,
      data: await newSettings.save()
    })
  } catch (error) {
    return catchError('Settings.store', error, req, res)
  }
}

// get setting by its key
const get = async (req, res) => {
  try {
    let data = await SettingsModel.findOne({ sKey: req.params.sKey }).lean()
    if (!data) return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].not_found.replace('##', 'Setting') })
    return res.status(status.OK).jsonp({
      message: messages[req.userLanguage].success,
      data
    })
  } catch (error) {
    return catchError('Settings.get', error, req, res)
  }
}

// update setting by its key
const update = async (req, res) => {
  try {
    let params = {
      sValue: req.body.sValue,
      dUpdatedAt: Date.now()
    }

    let data = await SettingsModel.findOneAndUpdate({ sKey: req.params.sKey }, { $set: params }, { new: true })
    if (!data) return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].not_found.replace('##', 'Setting') })

    return res.status(status.OK).jsonp({
      message: messages[req.userLanguage].updated_succ.replace('##', 'Page'),
      data
    })
  } catch (error) {
    return catchError('Settings.update', error, req, res)
  }
}

// list all the settings
const list = async (req, res) => {
  try {
    let data = await SettingsModel.find({}, { __v: 0, dCreatedAt: 0, dUpdatedAt: 0 }).lean()
    if (!data) return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].not_found.replace('##', 'Setting') })
    return res.status(status.OK).jsonp({
      message: messages[req.userLanguage].success,
      data
    })
  } catch (error) {
    return catchError('Settings.list', error, req, res)
  }
}

// remove a setting
const remove = async (req, res) => {
  try {
    let data = await SettingsModel.findOneAndRemove({ sKey: req.params.sKey })
    if (!data) return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].not_found.replace('##', 'Setting') })

    return res.status(status.OK).jsonp({ message: messages[req.userLanguage].success })
  } catch (error) {
    return catchError('Settings.remove', error, req, res)
  }
}

// render the CMS by its key
const renderByKey = async (req, res) => {
  try {
    let data = await SettingsModel.findOne({ sKey: req.params.sKey }).lean()

    if (!data) return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].not_found.replace('##', 'Setting') })
    return res.status(status.OK).set('Content-Type', 'text/html').send(data.sValue)
  } catch (error) {
    return catchError('Settings.renderByKey', error, req, res)
  }
}

module.exports = {
  store,
  get,
  update,
  list,
  remove,
  renderByKey
}
