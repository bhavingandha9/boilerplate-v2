const { messages, jsonStatus, status, catchError } = require('../../api.response')
const config = require('./../../config')
const _ = require('lodash')
const AWS = require('aws-sdk')
AWS.config.update({
  accessKeyId: config.awsAccesskeyID,
  secretAccessKey: config.awsSecretAccessKey,
  signatureVersion: 'v4',
  region: 'ap-south-1'
})

const s3 = new AWS.S3()

const getSignedUrl = async (req, res) => {
  try {
    req.checkBody('sFileName', messages[req.userLanguage].req_filename).notEmpty()
    req.checkBody('sContentType', messages[req.userLanguage].req_contenttype).notEmpty()

    let result = await req.getValidationResult()
    if (!result.isEmpty()) {
      return res.status(status.BadRequest).jsonp({
        status: jsonStatus.BadRequest,
        message: result.array()
      })
    }

    if (req.params.sFolderName !== 'profilepictures') {
      return res.status(status.BadRequest).jsonp({
        status: jsonStatus.BadRequest,
        message: messages[req.userLanguage].route_not_found
      })
    }

    let body = _.pick(req.body, ['sFileName', 'sContentType'])

    let key = `${req.user._id}_${Date.now()}_${body.sFileName}`
    let params = {
      Bucket: config.awsS3Bucket + req.params.sFolderName,
      Key: key,
      Expires: 300,
      ContentType: body.sContentType
    }

    s3.getSignedUrl('putObject', params, function (error, url) {
      if (error) {
        catchError('Issues.getSignedUrl', error, req, res)
      } else {
        return res.status(status.OK).jsonp({
          status: jsonStatus.OK,
          message: messages[req.userLanguage].presigned_succ,
          data: {
            sUrl: url,
            sPath: 'issues_media/' + key
          }
        })
      }
    })
  } catch (error) {
    catchError('Issues.getSignedUrl', error, req, res)
  }
}

module.exports = {
  getSignedUrl
}
