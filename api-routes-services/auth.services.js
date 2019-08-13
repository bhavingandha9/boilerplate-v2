/**
 * Auth service containes all type of services related to authentication of a user of admin.
 */

const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs')
const userModel = require('../models/users.model')
const { messages, status } = require('../api.response')
const config = require('../config')
const { sendmail, catchError } = require('./utilities.services')
const { publicEmailClients } = require('./../data')

class Auth {
  // Method used for check if email or mobile exist before registration
  async checkUserAvaliblity(req, res) {
    try {
      let body = _.pick(req.body, ['sEmail', 'sMobileNumber', 'sCountryCode'])
      let query = {
        $or: []
      }
      if (body.sEmail) {
        body.sEmail = body.sEmail.toLowerCase()
        if (publicEmailClients.includes(body.sEmail.split('@')[1]) && config.PUBLIC_EMAIL_BLOCK) {
          return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].public_email_not_allowed })
        }
      }

      if (!body.sEmail && !(body.sMobileNumber && body.sCountryCode)) {
        return res.status(status.BadRequest).jsonp({

          message: messages[req.userLanguage].req_email_number
        })
      }
      if (body.sEmail) query.$or.push({ sEmail: body.sEmail })
      if (body.sMobileNumber && body.sCountryCode) query.$or.push({ sMobileNumber: body.sMobileNumber, sCountryCode: body.sCountryCode })
      userModel.findOne(query).then(userFind => {
        if (userFind) {
          if (body.sEmail === userFind.sEmail && (body.sMobileNumber === userFind.sMobileNumber && body.sCountryCode === userFind.sCountryCode)) {
            return res.status(status.Forbidden).jsonp({ message: messages[req.userLanguage].email_number_exist })
          }
          if (body.sEmail === userFind.sEmail) {
            return res.status(status.Forbidden).jsonp({ message: messages[req.userLanguage].email_exist })
          }
          if ((body.sMobileNumber === userFind.sMobileNumber && body.sCountryCode === userFind.sCountryCode)) {
            return res.status(status.Forbidden).jsonp({ message: messages[req.userLanguage].number_exist })
          }
        } else {
          return res.status(status.OK).jsonp({ message: messages[req.userLanguage].user_not_found })
        }
      }).catch(error => {
        return catchError('Auth.checkUserAvaliblity', error, req, res)
      })
    } catch (error) {
      return catchError('Auth.checkUserAvaliblity', error, req, res)
    }
  }

  async adminLogin(req, res) {
    try {
      req.checkBody('sEmail', messages[req.userLanguage].req_email).notEmpty()
      req.checkBody('sPassword', messages[req.userLanguage].req_password).notEmpty()

      const result = await req.getValidationResult()
      if (!result.isEmpty()) return res.status(status.BadRequest).jsonp({ message: result.array() })

      const body = _.pick(req.body, ['sEmail', 'sPassword'])
      body.sEmail = body.sEmail.toLowerCase()
      userModel.findOne({ sEmail: body.sEmail }).then(user => {
        if (!user) {
          return res.status(status.NotFound).jsonp({ message: messages[req.userLanguage].auth_failed })
        }

        if (user.eStatus === 'b') {
          return res.status(status.Forbidden).jsonp({ message: messages[req.userLanguage].user_blocked })
        }

        if (user.eStatus === 'n') {
          return res.status(status.Forbidden).jsonp({ message: messages[req.userLanguage].user_not_verified })
        }

        if (user.eType !== 'admin') {
          return res.status(status.Forbidden).jsonp({ message: messages[req.userLanguage].user_not_admin })
        }

        if (!bcrypt.compareSync(body.sPassword, user.sPassword)) {
          return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].auth_failed })
        }

        let newToken = {
          sToken: jwt.sign({ _id: (user._id).toHexString() }, config.JWT_SECRET),
          sIpAddress: req.connection.remoteAddress,
          sPushToken: body.sPushToken
        }

        if (user.aJwtTokens.length < config.LOGIN_HARD_LIMIT || config.LOGIN_HARD_LIMIT === 0) {
          user.aJwtTokens.push(newToken)
        } else {
          user.aJwtTokens.splice(0, 1)
          user.aJwtTokens.push(newToken)
        }

        user.save().then(data => {
          return res.status(status.OK).jsonp({
            message: messages[req.userLanguage].succ_login,
            Authorization: newToken.sToken,
            userId: data._id
          })
        }).catch(error => {
          return catchError('Auth.adminLogin', error, req, res)
        })
      }).catch(error => {
        return catchError('Auth.adminLogin', error, req, res)
      })
    } catch (error) {
      return catchError('Auth.adminLogin', error, req, res)
    }
  }

  async userLogin(req, res) {
    try {
      req.checkBody('sEmail', messages[req.userLanguage].req_email).notEmpty()
      req.checkBody('sPassword', messages[req.userLanguage].req_password).notEmpty()
      const result = await req.getValidationResult()
      if (!result.isEmpty()) return res.status(status.BadRequest).jsonp({ message: result.array() })

      const body = _.pick(req.body, ['sLogin', 'sPassword', 'sPushToken'])
      body.sLogin = body.sLogin.toLowerCase()

      userModel.aggregate([
        {
          $addFields: {
            'newMob': {
              $concat: ['$sCountryCode', '$sMobileNumber']
            }
          }
        },
        {
          $addFields: {
            'mobSubtring': { $substr: ['$newMob', 1, -1] }
          }
        },
        {
          $match: {
            $and: [{ $or: [{ 'newMob': body.sLogin }, { 'sMobileNumber': body.sLogin }, { 'mobSubtring': body.sLogin }, { 'sEmail': body.sLogin }] }]
          }
        }
      ]).then(user => {
        if (!user || user.length < 1) {
          return res.status(status.NotFound).jsonp({ message: messages[req.userLanguage].auth_failed })
        }

        user = user[0]
        if (user.eStatus === 'b') {
          return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].user_blocked })
        }

        if (!bcrypt.compareSync(body.sPassword, user.sPassword)) {
          return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].auth_failed })
        }

        let newToken = {
          sToken: jwt.sign({ _id: (user._id).toHexString() }, config.JWT_SECRET),
          sIpAddress: req.connection.remoteAddress,
          sPushToken: body.sPushToken
        }

        if (user.aJwtTokens.length < config.LOGIN_HARD_LIMIT || config.LOGIN_HARD_LIMIT === 0) {
          user.aJwtTokens.push(newToken)
        } else {
          user.aJwtTokens.splice(0, 1)
          user.aJwtTokens.push(newToken)
        }

        user.save().then(data => {
          return res.status(status.OK).jsonp({
            message: messages[req.userLanguage].succ_login,
            Authorization: newToken.sToken
          })
        }).catch(error => {
          return catchError('Auth.userLogin', error, req, res)
        })
      }).catch(error => {
        return catchError('Auth.userLogin', error, req, res)
      })
    } catch (error) {
      return catchError('Auth.userLogin', error, req, res)
    }
  }

  async mailVerification(req, res) {
    try {
      let decoded = jwt.verify(req.params.sVerificationToken, config.JWT_SECRET)

      userModel.findOne({ _id: decoded._id, sVerificationToken: req.params.sVerificationToken }).then(data => {
        if (!data) return res.status(status.NotFound).jsonp({ message: messages[req.userLanguage].token_not_valid })

        data.eStatus = 'y'
        data.sVerificationToken = null
        data.save().then(() => {
          return res.status(status.OK).jsonp({ message: messages[req.userLanguage].user_verified_succ })
        }).catch(error => {
          return catchError('Auth.mailVerification', error, req, res)
        })
      }).catch(error => {
        return catchError('Auth.mailVerification', error, req, res)
      })
    } catch (error) {
      return catchError('Auth.mailVerification', error, req, res)
    }
  }

  async logout(req, res) {
    try {
      userModel.findByIdAndUpdate(req.user._id, { $pull: { 'aJwtTokens': { 'sToken': req.header('Authorization') } } }).then(user => {
        return res.status(status.OK).jsonp({ message: messages[req.userLanguage].succ_logout })
      }).catch(error => {
        return catchError('Auth.logout', error, req, res)
      })
    } catch (error) {
      return catchError('Auth.logout', error, req, res)
    }
  }

  async userChangePassword(req, res) {
    try {
      req.checkBody('sOldPassword', messages[req.userLanguage].req_old_password).notEmpty()
      req.checkBody('sNewPassword', messages[req.userLanguage].req_new_password).notEmpty()
      req.checkBody('sNewRetypedPassword', messages[req.userLanguage].req_new_retyped_password).notEmpty()

      if (!bcrypt.compareSync(req.body.sOldPassword, req.user.sPassword)) {
        return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].wrong_old_password })
      }

      if (req.body.sNewPassword !== req.body.sNewRetypedPassword) {
        return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].password_not_match })
      }

      req.user.sPassword = req.body.sNewPassword
      req.user.save().then(() => {
        return res.status(status.OK).jsonp({ message: messages[req.userLanguage].password_changed })
      }).catch(error => {
        return catchError('Auth.userChangePassword', error, req, res)
      })
    } catch (error) {
      return catchError('Auth.userChangePassword', error, req, res)
    }
  }

  async forgotPasswordMail(req, res) {
    try {
      req.checkBody('sEmail', messages[req.userLanguage].req_email).notEmpty()
      req.checkBody('sEmail', messages[req.userLanguage].req_email).isEmail()

      const result = await req.getValidationResult()
      if (!result.isEmpty()) return res.status(status.BadRequest).jsonp({ message: result.array() })

      userModel.findOne({ sEmail: req.body.sEmail.toLowerCase() }).then(user => {
        if (!user) {
          return res.status(status.NotFound).jsonp({ message: messages[req.userLanguage].user_not_found })
        }
        if (user.eStatus === 'b') {
          return res.status(status.NotFound).jsonp({ message: messages[req.userLanguage].user_blocked })
        }

        user.sVerificationToken = jwt.sign({ _id: (user._id).toHexString() }, config.JWT_SECRET, { expiresIn: config.JWT_VALIDITY })
        user.save().then(data => {
          sendmail('forgot_password_mail.html',
            {
              SITE_NAME: config.SITE_NAME,
              SITE_LOGO: `${config.MAIL_HOST_LINK}/${config.SITE_IMAGE}`,
              USERNAME: data.sFullName,
              ACTIVELINK: `${config.FRONTEND_URL}/reset/${data.sVerificationToken}`
            }, {
              from: process.env.SMTP_FROM,
              to: data.sEmail,
              subject: 'Forgot Password'
            })
            .then(() => {
              return res.status(status.OK).jsonp({ message: messages[req.userLanguage].succ_mail_sent })
            }).catch(error => {
              return catchError('Auth.forgotPasswordMail', error, req, res)
            })
        }).catch(error => {
          return catchError('Auth.forgotPasswordMail', error, req, res)
        })
      }).catch(error => {
        return catchError('Auth.forgotPasswordMail', error, req, res)
      })
    } catch (error) {
      return catchError('Auth.forgotPasswordMail', error, req, res)
    }
  }

  async forgotPassword(req, res) {
    try {
      req.checkBody('sNewPassword', messages[req.userLanguage].req_new_password).notEmpty()
      req.checkBody('sNewRetypedPassword', messages[req.userLanguage].req_new_retyped_password).notEmpty()

      const result = await req.getValidationResult()
      if (!result.isEmpty()) res.status(status.BadRequest).jsonp({ message: result.array() })

      jwt.verify(req.params.sVerificationToken, config.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].token_not_valid })

        userModel.findOne({ _id: decoded._id, sVerificationToken: req.params.sVerificationToken }).then(data => {
          if (!data) return res.status(status.NotFound).jsonp({ message: messages[req.userLanguage].token_not_valid })

          if (req.body.sNewPassword !== req.body.sNewRetypedPassword) {
            return res.status(status.BadRequest).jsonp({ message: messages.password_not_match })
          }

          data.sPassword = req.body.sNewPassword
          data.sVerificationToken = null

          data.save().then(() => {
            return res.status(status.OK).jsonp({ message: messages[req.userLanguage].password_changed })
          }).catch(error => {
            return catchError('Auth.forgotPassword', error, req, res)
          })
        }).catch(error => {
          return catchError('Auth.forgotPassword', error, req, res)
        })
      })
    } catch (error) {
      return catchError('Auth.forgotPassword', error, req, res)
    }
  }

  // render reset password view for user
  async reset(req, res) {
    try {
      jwt.verify(req.params.sVerificationToken, config.JWT_SECRET, (err, data) => {
        if (err || !data) {
          return res.render('token_expire', {
            CONTACT_EMAIL: config.CONTACT_EMAIL,
            SITE_NAME: config.SITE_NAME,
            SITE_LOGO: `${config.MAIL_HOST_LINK}/${config.SITE_IMAGE}`
          })
        }
        userModel.findOne({ sVerificationToken: req.params.sVerificationToken }).then(validUser => {
          if (!validUser) {
            return res.render('token_expire', {
              CONTACT_EMAIL: config.CONTACT_EMAIL,
              SITE_NAME: config.SITE_NAME,
              SITE_LOGO: `${config.MAIL_HOST_LINK}/${config.SITE_IMAGE}`
            })
          }
          return res.render('resetpassword', {
            SITE_NAME: config.SITE_NAME,
            SITE_LOGO: `${config.MAIL_HOST_LINK}/${config.SITE_IMAGE}`,
            title: 'Reset password',
            sVerificationToken: req.params.sVerificationToken
          })
        }).catch(error => {
          return catchError('Auth.reset', error, req, res)
        })
      })
    } catch (error) {
      return catchError('Auth.reset', error, req, res)
    }
  }

  // check if forgot password link is valid or not
  async forgotpasswordTokenVerified(req, res) {
    userModel.findOne({ sVerificationToken: req.params.sVerificationToken }).then(data => {
      if (!data) return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].not_token_verify })

      return res.status(status.OK).jsonp({ message: messages[req.userLanguage].token_verify })
    }).catch(error => {
      return catchError('Auth.forgotpasswordTokenVerified', error, res)
    })
  }

  // render the expired link view
  async linkTimeout(req, res) {
    return res.render('token_expire', { SITE_NAME: config.SITE_NAME })
  }

  async verified(req, res) {
    userModel.filterData(req.user)
    return res.status(status.OK).jsonp({ message: messages[req.userLanguage].userAuthenticated, user: req.user })
  }
}

module.exports = new Auth()
