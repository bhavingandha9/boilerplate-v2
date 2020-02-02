const axios = require('axios')
const config = require('./../../config')
const _ = require('lodash')

const pushNotification = (data, callback) => {
  if (!data.deviceIds) return callback('No device found')// eslint-disable-line
  var deviceIds = _.chunk([...new Set(data.deviceIds)], 1000)
  for (let i = 0; i < deviceIds.length; i++) {
    axios.post(config.ONE_SIGNAL_URL,
      {
        app_id: config.ONE_SIGNAL_APP_ID,
        contents: {
          en: data.contents
        },
        headings: {
          en: data.heading ? data.heading : 'Boilerplate'
        },
        ios_badgeCount: 1,
        ios_badgeType: 'Increase',
        ios_category: '',
        data: {
          type: data.type,
          roomId: data.roomId
        },
        include_player_ids: Array.isArray(deviceIds[i]) ? deviceIds[i] : [deviceIds[i]],
        send_after: data.send_after ? data.send_after : ''
      },
      {
        headers: {
          authorization: 'Basic ' + config.ONE_SIGNAL_REST_KEY,
          'content-type': 'application/json'
        }
      })
      .then(response => {
        return callback(null, response.data)
      }).catch(error => {
        if (error.response) return callback(error.response.data)
        else return callback(error)
      })
  }
}

module.exports = { pushNotification }
