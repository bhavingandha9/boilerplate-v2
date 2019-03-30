const request = require('request')
const config = require('./../../config')
const _ = require('lodash')

const pushNotification = (data, callback) => {
  if (!data.deviceIds) return callback('No device found')
  var deviceIds = _.chunk([...new Set(data.deviceIds)], 1000)
  for (let i = 0; i < deviceIds.length; i++) {
    request({
      method: 'POST',
      uri: config.ONE_SIGNAL_URL,
      headers: {
        'authorization': 'Basic ' + config.ONE_SIGNAL_REST_KEY,
        'content-type': 'application/json'
      },
      json: true,
      body: {
        'app_id': config.ONE_SIGNAL_APP_ID,
        'contents': {
          en: data.contents
        },
        'headings': {
          en: !_.isUndefined(data.heading) ? data.heading : 'Lastdeck'
        },
        ios_badgeCount: 1,
        ios_badgeType: 'Increase',
        ios_category: '',
        data: {
          'type': data.type,
          'roomId': data.roomId
        },
        'include_player_ids': Array.isArray(deviceIds[i]) ? deviceIds[i] : [deviceIds[i]],
        'send_after': !_.isUndefined(data.send_after) ? data.send_after : ''
      }
    },
      function (error, response, body) {
        if (error) return callback(error)
        if (body.errors) return callback(body.errors)

        return callback(null, body)
      }
    )
  }
}

module.exports = { pushNotification }
