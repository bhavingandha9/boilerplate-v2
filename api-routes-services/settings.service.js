const SettingsModel = require('../models/settings.model')
const { removenull, catchError } = require('./utilities.services')
const { messages, status } = require('../api.response')

class Settings {
  // to create a new setting
  async store(req, res) {
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

      newSettings.save().then(data => {
        return res.status(status.OK).jsonp({
          message: messages[req.userLanguage].success,
          data
        })
      }).catch(error => {
        return catchError('Settings.store', error, req, res)
      })
    } catch (error) {
      return catchError('Settings.store', error, req, res)
    }
  }

  // get setting by its key
  async get(req, res) {
    try {
      SettingsModel
        .findOne({ sKey: req.params.sKey })
        .lean()
        .then(data => {
          if (!data) return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].not_found.replace('##', 'Setting') })
          return res.status(status.OK).jsonp({
            message: messages[req.userLanguage].success,
            data
          })
        }).catch(error => {
          return catchError('Settings.get', error, req, res)
        })
    } catch (error) {
      return catchError('Settings.get', error, req, res)
    }
  }

  // update setting by its key
  async update(req, res) {
    try {
      let params = {
        sValue: req.body.sValue,
        dUpdatedAt: Date.now()
      }
      removenull(params)
      SettingsModel
        .findOneAndUpdate({ sKey: req.params.sKey }, { $set: params }, { new: true })
        .then(data => {
          if (!data) return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].not_found.replace('##', 'Setting') })

          return res.status(status.OK).jsonp({
            message: messages[req.userLanguage].updated_succ.replace('##', 'Page'),
            data
          })
        }).catch(error => {
          return catchError('Settings.update', error, req, res)
        })
    } catch (error) {
      return catchError('Settings.update', error, req, res)
    }
  }

  // list all the settings
  async list(req, res) {
    try {
      SettingsModel
        .find({}, { __v: 0, dCreatedAt: 0, dUpdatedAt: 0 })
        .lean()
        .then(data => {
          if (!data) return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].not_found.replace('##', 'Setting') })
          return res.status(status.OK).jsonp({
            message: messages[req.userLanguage].success,
            data
          })
        }).catch(error => {
          return catchError('Settings.list', error, req, res)
        })
    } catch (error) {
      return catchError('Settings.list', error, req, res)
    }
  }

  // remove a setting
  async remove(req, res) {
    try {
      SettingsModel.findOneAndRemove({ sKey: req.params.sKey }).then(data => {
        if (!data) return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].not_found.replace('##', 'Setting') })

        return res.status(status.OK).jsonp({ message: messages[req.userLanguage].success })
      }).catch(error => {
        return catchError('Settings.remove', error, req, res)
      })
    } catch (error) {
      return catchError('Settings.remove', error, req, res)
    }
  }

  // render the CMS by its key
  async renderByKey(req, res) {
    try {
      SettingsModel
        .findOne({ sKey: req.params.sKey })
        .lean()
        .then(data => {
          if (!data) return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].not_found.replace('##', 'Setting') })
          return res.status(status.OK).set('Content-Type', 'text/html').send(data.sValue)
        }).catch(error => {
          return catchError('Settings.get', error, req, res)
        })
    } catch (error) {
      return catchError('Settings.renderByKey', error, req, res)
    }
  }
}

module.exports = new Settings()
