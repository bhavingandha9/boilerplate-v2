/**
 * User Services for all users(admin, emailUser, guestUser, facebookUser) management,
 * @method {store} is for user signup.
 * @method {get} is for get a single user data.
 * @method {update} is to update a single user data.
 * @method {remove} is to remove a single user data (currently its soft delete).
 * @method {userProfilePictureUpload} is a separate API function for uploading user profile picture after user stored
 */

const _ = require('lodash')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const UserModel = require('../models/users.model')
const { messages, status } = require('../api.response')
const config = require('../config')
const { removenull, sendmail, catchError } = require('./utilities.service')
const { publicEmailClients } = require('../data')
const errorLogs = fs.createWriteStream('error.log', { flags: 'a' })

AWS.config.update({
  accessKeyId: config.awsAccesskeyID,
  secretAccessKey: config.awsSecretAccessKey,
  signatureVersion: 'v4',
  region: 'ap-south-1'
})

const s3 = new AWS.S3()

const storage = multerS3({
  s3: s3,
  bucket: config.S3_BUCKET_NAME + config.PROFILE_PICTURE_PATH,
  acl: 'public-read',
  key: function (req, file, callback) {
    callback(null, `${req._id}_${Date.now()}_${file.originalname}`)
  }
})

class User {
  async store(req, res) {
    try {
      req.checkBody('sPassword', messages[req.userLanguage].req_password).notEmpty()

      if (!req.body.sEmail && !req.body.sMobileNumber) {
        return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].req_email_number })
      }
      if (req.body.sEmail) {
        req.checkBody('sEmail', messages[req.userLanguage].req_email).isEmail()
      }
      if (req.body.sMobileNumber) {
        req.checkBody('sCountryCode', messages[req.userLanguage].req_sCountryCode).notEmpty()
      }

      let result = await req.getValidationResult()
      if (!result.isEmpty()) return res.status(status.BadRequest).jsonp({ message: result.array() })

      let body = _.pick(req.body, ['sEmail', 'sPassword', 'eGender', 'eType', 'sCountryCode', 'sMobileNumber', 'sPushToken'])
      body.sEmail = body.sEmail.toLowerCase()
      if (publicEmailClients.includes(body.sEmail.split('@')[1]) && config.PUBLIC_EMAIL_BLOCK) {
        return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].public_email_not_allowed })
      } else {
        let params = {
          sEmail: body.sEmail,
          sPassword: body.sPassword,
          eType: body.eType,
          sCountryCode: body.sCountryCode,
          sMobileNumber: body.sMobileNumber,
          eGender: body.eGender,
          dUpdatedAt: Date.now(),
          dCreatedAt: Date.now()
        }
        removenull(params)

        let query = {
          $or: []
        }

        if (body.sEmail) query.$or.push({ sEmail: body.sEmail })
        if (body.sMobileNumber) query.$or.push({ sMobileNumber: body.sMobileNumber, sCountryCode: body.sCountryCode })

        UserModel.findOne(query).then(user => {
          if (user) {
            if (body.sEmail === user.sEmail) {
              return res.status(status.Forbidden).jsonp({ message: messages[req.userLanguage].email_exist })
            }
            if (body.sMobileNumber === user.sMobileNumber) {
              return res.status(status.Forbidden).jsonp({ message: messages[req.userLanguage].number_exist })
            }
            if (body.sEmail === user.sEmail && body.sMobileNumber === user.sMobileNumber) {
              return res.status(status.Forbidden).jsonp({ message: messages[req.userLanguage].email_number_exist })
            }
          }
          let newUser = new UserModel(params)
          newUser.save().then(data => {
            if (config.MAIL_VERIFICATION) {
              data.sVerificationToken = jwt.sign({ _id: data._id }, config.JWT_SECRET, { expiresIn: config.JWT_VALIDITY })

              data.save().then(data => {
                sendmail('account_activated.ejs',
                  {
                    sUsername: data.name,
                    SITE_NAME: config.SITE_NAME,
                    SITE_IMAGE: config.SITE_IMAGE,
                    ACTIVELINK: `${config.MAIL_HOST_LINK}/mail/verification/${data.sVerificationToken}`,
                    CURRENT_YEAR: new Date().getFullYear()
                  }, {
                    from: process.env.SMTP_FROM,
                    to: body.sEmail, // list of receivers
                    subject: 'Email Verification' // Subject line
                  })
                  .then(() => {
                    UserModel.filterData(data)
                    return res.status(status.OK).jsonp({
                      message: messages[req.userLanguage].user_save_succ,
                      data
                    })
                  }).catch(error => {
                    console.log(error)
                    errorLogs.write(new Date().toString() + error + '\r\n')
                    data.remove().then(() => {
                      return res.status(status.InternalServerError).jsonp({
                        message: messages[req.userLanguage].mail_fail_user_succ
                      })
                    }).catch(error => {
                      return catchError('User.store', error, req, res)
                    })
                  })
              }).catch(error => {
                return catchError('User.store', error, req, res)
              })
            } else {
              let tokenPush = {
                sToken: jwt.sign({ _id: data._id }, config.JWT_SECRET),
                sPushToken: body.sPushToken,
                sIpAddres: req.connection.remoteAddress
              }

              removenull(tokenPush)
              data.eStatus = 'y'
              data.aJwtTokens.push(tokenPush)
              UserModel.filterData(data)
              data.save().then(() => {
                return res.status(status.OK).jsonp({
                  Authorization: tokenPush.sToken,
                  message: messages[req.userLanguage].user_save_succ,
                  data
                })
              }).catch(error => {
                return catchError('User.store', error, req, res)
              })
            }
          }).catch(error => {
            return catchError('User.store', error, req, res)
          })
        }).catch(error => {
          return catchError('User.store', error, req, res)
        })
      }
    } catch (error) {
      return catchError('User.store', error, req, res)
    }
  }

  async get(req, res) {
    try {
      UserModel.findOne({ _id: req.params.id }).then(data => {
        if (!data) {
          return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].user_not_found })
        }
        if (data.sProfilePicture) {
          data.sProfilePicture = `${config.S3_BUCKET_URL}${config.PROFILE_PICTURE_PATH}/${data.sProfilePicture}`
        }
        return res.status(status.OK).jsonp({
          message: messages[req.userLanguage].user_get_succ,
          data
        })
      }).catch(error => {
        return catchError('User.get', error, req, res)
      })
    } catch (error) {
      return catchError('User.get', error, req, res)
    }
  }

  async update(req, res) {
    try {
      let body = _.pick(req.body, ['eType', 'eStatus', 'eGender', 'sMobileNumber', 'sCountryCode'])

      let params = {
        eType: body.eType,
        eStatus: body.eStatus,
        sMobileNumber: body.sMobileNumber,
        sCountryCode: body.sCountryCode,
        eGender: body.eGender,
        dUpdatedAt: Date.now()
      }
      removenull(params)

      UserModel.findOneAndUpdate({ _id: req.params.id }, { $set: params }, { new: true, 'fields': { 'sJwtToken': false, 'sVerificationToken': false, 'sPassword': false } }).then(data => {
        if (!data) {
          return res.status(status.Locked).jsonp({ message: messages[req.userLanguage].user_not_found })
        }
        if (data.sProfilePicture) {
          data.sProfilePicture = `${config.S3_BUCKET_URL}/profilepictures/${data.sProfilePicture}`
        }
        return res.status(status.OK).jsonp({
          message: messages[req.userLanguage].user_update_succ,
          data
        })
      }).catch(error => {
        return catchError('User.update', error, req, res)
      })
    } catch (error) {
      return catchError('User.update', error, req, res)
    }
  }

  async remove(req, res) {
    try {
      UserModel.findById(req.params.id).then(data => {
        if (!data) {
          return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].user_not_found })
        }
        data.eStatus = 'd'
        data.save().then(data => {
          return res.status(status.OK).jsonp({
            message: messages[req.userLanguage].user_remove_succ
          })
        }).catch(error => {
          return catchError('User.remove', error, req, res)
        })
      }).catch(error => {
        return catchError('User.remove', error, req, res)
      })
    } catch (error) {
      return catchError('User.remove', error, req, res)
    }
  }

  async list(req, res) {
    try {
      req.checkBody('start', messages[req.userLanguage].req_start).notEmpty()
      req.checkBody('start', messages[req.userLanguage].req_start_numeric).isNumeric()
      req.checkBody('limit', messages[req.userLanguage].req_limit).notEmpty()
      req.checkBody('limit', messages[req.userLanguage].req_limit_numeric).isNumeric()

      let result = await req.getValidationResult()
      if (!result.isEmpty()) return res.status(status.BadRequest).jsonp({ message: result.array() })

      let body = _.pick(req.body, ['start', 'limit', 'sort', 'order', 'search'])

      let start = body.start
      let limit = body.limit
      body.sort_by = '_id'
      body.order_by = 1
      if (!_.isUndefined(body.order) && body.order !== '') {
        if (body.order === 'asc') {
          body.order_by = 1
        } else {
          body.order_by = -1
        }
      }
      if (!_.isUndefined(body.sort) && body.sort !== '') {
        body.sort_by = body.sort
      }

      let sorting = {
        [body.sort_by]: body.order_by
      }

      let search = ''
      if (body.search) {
        search = body.search.replace(/\\/g, '\\\\')
          .replace(/\$/g, '\\$')
          .replace(/\*/g, '\\*')
          .replace(/\+/g, '\\+')
          .replace(/\)/g, '\\)')
          .replace(/\(/g, '\\(')
          .replace(/'/g, '\\\'')
          .replace(/"/g, '\\"')
      }

      UserModel.aggregate([
        {
          $sort: sorting
        },
        {
          '$match': {
            $or: [
              { sEmail: { $regex: new RegExp('^.*' + search + '.*', 'i') } }
            ]
          }
        },
        {
          '$match': {
            eStatus: { '$ne': 'd' }
          }
        },
        {
          $group: {
            _id: 0,
            count: {
              $sum: 1
            },
            document: {
              $push: '$$ROOT'
            }
          }
        },
        {
          $unwind: '$document'
        },
        { '$limit': parseInt(start) + parseInt(limit) },
        { '$skip': parseInt(start) },
        {
          $group: {
            _id: 0,
            total: {
              $first: '$count'
            },
            results: {
              $push: {
                _id: '$document._id',
                sEmail: { $ifNull: ['$document.sEmail', ''] },
                eType: { $ifNull: ['$document.eType', ''] },
                eStatus: { $ifNull: ['$document.eStatus', ''] },
                sCountryCode: { $ifNull: ['$document.sCountryCode', ''] },
                sMobileNumber: { $ifNull: ['$document.sMobileNumber', ''] },
                eGender: { $ifNull: ['$document.eGender', ''] },
                sProfilePicture: { $cond: ['$document.sProfilePicture', { $concat: [`${config.S3_BUCKET_URL}${config.PROFILE_PICTURE_PATH}`, '$document.sProfilePicture'] }, null] },
                dUpdatedAt: { $ifNull: ['$document.dUpdatedAt', ''] },
                dCreatedAt: { $ifNull: ['$document.dCreatedAt', ''] }
              }
            }
          }
        }
      ]).exec().then(data => {
        if (data.length < 1) {
          return res.status(status.OK).jsonp({
            message: messages[req.userLanguage].user_not_found,
            data: [],
            TotalData: 0
          })
        }

        return res.status(status.OK).jsonp({
          message: messages[req.userLanguage].user_list_get_succ,
          data: data[0].results,
          total: data[0].total
        })
      }).catch(error => {
        return catchError('User.list', error, req, res)
      })
    } catch (error) {
      return catchError('User.list', error, req, res)
    }
  }

  async setPushToken(req, res) {
    try {
      req.user.aJwtTokens = req.user.aJwtTokens.map((singleToken, i) => {
        if (singleToken.sToken === req.header('Authorization')) {
          singleToken.sPushToken = req.body.sPushToken
        }
        return singleToken
      })
      req.user.save().then(data => {
        return res.status(status.OK).jsonp({
          message: messages[req.userLanguage].success
        })
      }).catch(error => {
        return catchError('User.checkAvaliblity', error, req, res)
      })
    } catch (error) {
      return catchError('User.checkAvaliblity', error, req, res)
    }
  }

  async userProfilePictureUpload(req, res) {
    try {
      let upload = multer({
        storage: storage
      }).single('sProfilePicture')

      upload(req, res, async (error) => {
        if (error) {
          return catchError('Users.userProfilePictureUpload', error, res)
        }

        if (req.user.sProfilePicture && req.user.sProfilePicture !== 'default.jpeg') {
          let params = { Bucket: config.S3_BUCKET_NAME, Key: `profilepictures/${req.user.sProfilePicture}` }

          s3.deleteObject(params, (error, data) => {
            console.log({ error })
          })
        }
        req.user.sProfilePicture = req.file.key
        req.user.save().then(() => {
          return res.status(status.OK).jsonp({ message: messages[req.userLanguage].image_upload_succ, image: req.file.location })
        }).catch(error => {
          return catchError('Users.userProfilePictureUpload', error, res)
        })
      })
    } catch (error) {
      return catchError('Users.userProfilePictureUpload', error, res)
    }
  }
}

module.exports = new User()
