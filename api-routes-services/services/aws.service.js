const { messages, jsonStatus, status, catchError } = require('../../api.response')
const config = require('./../../config')
const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_KEY,
  signatureVersion: 'v4'
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

    if (!(
      req.params.sFolderName === 'profilepicture' ||
      req.params.sFolderName === 'logos'
    )) {
      return res.status(status.BadRequest).jsonp({
        status: jsonStatus.BadRequest,
        message: messages[req.userLanguage].not_found.replace('##', 'Page')
      })
    }

    req.body.sFileName = req.body.sFileName.replace('/', '_')
    req.body.sFileName = req.body.sFileName.replace(/\s/gi, '_')
    let Key
    if (req.params.sFolderName === 'players' || req.params.sFolderName === 'logos') {
      Key = `${req.params.sFolderName}/${req.body.sFileName}`
    } else {
      Key = `${req.params.sFolderName}/${req.user._id}_${Date.now()}_${req.body.sFileName}`
    }
    let params = {
      Bucket: config.S3_BUCKET_NAME,
      Key,
      Expires: 300,
      ContentType: req.body.sContentType
    }

    s3.getSignedUrl('putObject', params, function (error, url) {
      if (error) {
        catchError('getSignedUrl', error, req, res)
      } else {
        return res.status(status.OK).jsonp({
          status: jsonStatus.OK,
          message: messages[req.userLanguage].presigned_succ,
          data: {
            sUrl: url,
            sPath: Key
          }
        })
      }
    })
  } catch (error) {
    catchError('getSignedUrl', error, req, res)
  }
}

module.exports = {
  getSignedUrl,
  s3
}
