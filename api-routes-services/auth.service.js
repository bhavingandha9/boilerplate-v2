/**
 * Auth service containes all type of services related to authentication of a user of admin.
 */

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs')
const userModel = require('../models/users.model')
const { messages, status } = require('../api.response')
const config = require('../config')
const { sendmail, catchError } = require('./utilities.service')
const { publicEmailClients } = require('../data')

class Auth {
  // Method used for check if email or mobile exist before registration
  async checkUserAvaliblity(req, res) {
    try {
      let query = { $or: [] }
      if (req.body.sEmail) {
        req.body.sEmail = req.body.sEmail.toLowerCase()
        if (config.PUBLIC_EMAIL_BLOCK && publicEmailClients.includes(req.body.sEmail.split('@')[1])) {
          return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].public_email_not_allowed })
        }
      }

      if (!req.body.sEmail && !(req.body.sMobileNumber && req.body.sCountryCode)) {
        return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].req_email_number })
      }
      if (req.body.sEmail) query.$or.push({ sEmail: req.body.sEmail })
      if (req.body.sMobileNumber && req.body.sCountryCode) query.$or.push({ sMobileNumber: req.body.sMobileNumber, sCountryCode: req.body.sCountryCode })
      let userFind = await userModel.findOne(query)
      if (userFind) {
        if (req.body.sEmail === userFind.sEmail && (req.body.sMobileNumber === userFind.sMobileNumber && req.body.sCountryCode === userFind.sCountryCode)) {
          return res.status(status.Forbidden).jsonp({ message: messages[req.userLanguage].email_number_exist })
        }
        if (req.body.sEmail === userFind.sEmail) {
          return res.status(status.Forbidden).jsonp({ message: messages[req.userLanguage].email_exist })
        }
        if ((req.body.sMobileNumber === userFind.sMobileNumber && req.body.sCountryCode === userFind.sCountryCode)) {
          return res.status(status.Forbidden).jsonp({ message: messages[req.userLanguage].number_exist })
        }
      } else {
        return res.status(status.OK).jsonp({ message: messages[req.userLanguage].not_found.replace('##', 'User') })
      }
    } catch (error) {
      return catchError('Auth.checkUserAvaliblity', error, req, res)
    }
  }

  async adminLogin(req, res) {
    try {
      req.checkBody('sEmail', messages[req.userLanguage].required.replace('##', 'Email')).notEmpty()
      req.checkBody('sPassword', messages[req.userLanguage].required.replace('##', 'Password')).notEmpty()

      const result = await req.getValidationResult()
      if (!result.isEmpty()) return res.status(status.BadRequest).jsonp({ message: result.array() })

      req.body.sEmail = req.body.sEmail.toLowerCase()
      let user = await userModel.findOne({ sEmail: req.body.sEmail })
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

      if (!bcrypt.compareSync(req.body.sPassword, user.sPassword)) {
        return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].auth_failed })
      }

      let newToken = {
        sToken: jwt.sign({ _id: (user._id).toHexString() }, config.JWT_SECRET),
        sIpAddress: req.connection.remoteAddress,
        sPushToken: req.body.sPushToken
      }

      if (user.aJwtTokens.length < config.LOGIN_HARD_LIMIT || config.LOGIN_HARD_LIMIT === 0) {
        user.aJwtTokens.push(newToken)
      } else {
        user.aJwtTokens.splice(0, 1)
        user.aJwtTokens.push(newToken)
      }

      let data = await user.save()
      userModel.filterData(data)
      return res.status(status.OK).jsonp({
        message: messages[req.userLanguage].succ_login,
        Authorization: newToken.sToken,
        data
      })
    } catch (error) {
      return catchError('Auth.adminLogin', error, req, res)
    }
  }

  async userLogin(req, res) {
    try {
      req.checkBody('sEmail', messages[req.userLanguage].required.replace('##', 'Email')).notEmpty()
      req.checkBody('sPassword', messages[req.userLanguage].required.replace('##', 'Password')).notEmpty()
      const result = await req.getValidationResult()
      if (!result.isEmpty()) return res.status(status.BadRequest).jsonp({ message: result.array() })

      req.body.sLogin = req.body.sLogin.toLowerCase()

      let user = await userModel.aggregate([
        {
          $addFields: {
            newMob: {
              $concat: ['$sCountryCode', '$sMobileNumber']
            }
          }
        },
        {
          $addFields: {
            mobSubtring: { $substr: ['$newMob', 1, -1] }
          }
        },
        {
          $match: {
            $and: [{ $or: [{ 'newMob': req.body.sLogin }, { 'sMobileNumber': req.body.sLogin }, { 'mobSubtring': req.body.sLogin }, { 'sEmail': req.body.sLogin }] }]
          }
        }
      ])
      if (!user || user.length < 1) {
        return res.status(status.NotFound).jsonp({ message: messages[req.userLanguage].auth_failed })
      }

      user = user[0]
      if (user.eStatus === 'b') {
        return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].user_blocked })
      }

      if (!bcrypt.compareSync(req.body.sPassword, user.sPassword)) {
        return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].auth_failed })
      }

      let newToken = {
        sToken: jwt.sign({ _id: (user._id).toHexString() }, config.JWT_SECRET),
        sIpAddress: req.connection.remoteAddress,
        sPushToken: req.body.sPushToken
      }

      if (user.aJwtTokens.length < config.LOGIN_HARD_LIMIT || config.LOGIN_HARD_LIMIT === 0) {
        user.aJwtTokens.push(newToken)
      } else {
        user.aJwtTokens.splice(0, 1)
        user.aJwtTokens.push(newToken)
      }

      await user.save()
      return res.status(status.OK).jsonp({
        message: messages[req.userLanguage].succ_login,
        Authorization: newToken.sToken
      })
    } catch (error) {
      return catchError('Auth.userLogin', error, req, res)
    }
  }

  async mailVerification(req, res) {
    try {
      let decoded = jwt.verify(req.params.sVerificationToken, config.JWT_SECRET)
      let data = await userModel.findOne({ _id: decoded._id, sVerificationToken: req.params.sVerificationToken })
      if (!data) return res.status(status.NotFound).jsonp({ message: messages[req.userLanguage].token_not_valid })

      data.eStatus = 'y'
      data.sVerificationToken = null
      await data.save()
      return res.status(status.OK).jsonp({ message: messages[req.userLanguage].user_verified_succ })
    } catch (error) {
      return catchError('Auth.mailVerification', error, req, res)
    }
  }

  async logout(req, res) {
    try {
      await userModel.findByIdAndUpdate(req.user._id, { $pull: { 'aJwtTokens': { 'sToken': req.header('Authorization') } } })
      return res.status(status.OK).jsonp({ message: messages[req.userLanguage].succ_logout })
    } catch (error) {
      return catchError('Auth.logout', error, req, res)
    }
  }

  async userChangePassword(req, res) {
    try {
      req.checkBody('sOldPassword', messages[req.userLanguage].required.replace('##', 'Old Password')).notEmpty()
      req.checkBody('sNewPassword', messages[req.userLanguage].required.replace('##', 'New Password')).notEmpty()
      req.checkBody('sNewRetypedPassword', messages[req.userLanguage].required.replace('##', 'New Retyped Password')).notEmpty()

      if (!bcrypt.compareSync(req.body.sOldPassword, req.user.sPassword)) {
        return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].wrong_old_password })
      }

      if (req.body.sNewPassword !== req.body.sNewRetypedPassword) {
        return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].password_not_match })
      }

      req.user.sPassword = req.body.sNewPassword
      await req.user.save()
      return res.status(status.OK).jsonp({ message: messages[req.userLanguage].password_changed })
    } catch (error) {
      return catchError('Auth.userChangePassword', error, req, res)
    }
  }

  async forgotPasswordMail(req, res) {
    try {
      req.checkBody('sEmail', messages[req.userLanguage].required.replace('##', 'Email')).notEmpty()
      req.checkBody('sEmail', messages[req.userLanguage].required.replace('##', 'Email')).isEmail()

      const result = await req.getValidationResult()
      if (!result.isEmpty()) return res.status(status.BadRequest).jsonp({ message: result.array() })

      let user = await userModel.findOne({ sEmail: req.body.sEmail.toLowerCase() })
      if (!user) {
        return res.status(status.NotFound).jsonp({ message: messages[req.userLanguage].not_found.replace('##', 'User') })
      }
      if (user.eStatus === 'b') {
        return res.status(status.NotFound).jsonp({ message: messages[req.userLanguage].user_blocked })
      }

      user.sVerificationToken = jwt.sign({ _id: (user._id).toHexString() }, config.JWT_SECRET, { expiresIn: config.JWT_VALIDITY })
      let data = await user.save()
      await sendmail('forgot_password_mail.html',
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
      return res.status(status.OK).jsonp({ message: messages[req.userLanguage].succ_mail_sent })
    } catch (error) {
      return catchError('Auth.forgotPasswordMail', error, req, res)
    }
  }

  async forgotPassword(req, res) {
    try {
      req.checkBody('sNewPassword', messages[req.userLanguage].required.replace('##', 'New Password')).notEmpty()
      req.checkBody('sNewRetypedPassword', messages[req.userLanguage].required.replace('##', 'New Retyped Password')).notEmpty()

      const result = await req.getValidationResult()
      if (!result.isEmpty()) res.status(status.BadRequest).jsonp({ message: result.array() })

      jwt.verify(req.params.sVerificationToken, config.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].token_not_valid })

        let data = await userModel.findOne({ _id: decoded._id, sVerificationToken: req.params.sVerificationToken })
        if (!data) return res.status(status.NotFound).jsonp({ message: messages[req.userLanguage].token_not_valid })

        if (req.body.sNewPassword !== req.body.sNewRetypedPassword) {
          return res.status(status.BadRequest).jsonp({ message: messages[req.userLanguage].password_not_match })
        }

        data.sPassword = req.body.sNewPassword
        data.sVerificationToken = null

        await data.save()
        return res.status(status.OK).jsonp({ message: messages[req.userLanguage].password_changed })
      })
    } catch (error) {
      return catchError('Auth.forgotPassword', error, req, res)
    }
  }

  // render reset password view for user
  async reset(req, res) {
    try {
      jwt.verify(req.params.sVerificationToken, config.JWT_SECRET, async (err, data) => {
        if (err || !data) {
          return res.render('token_expire', {
            CONTACT_EMAIL: config.CONTACT_EMAIL,
            SITE_NAME: config.SITE_NAME,
            SITE_LOGO: `${config.MAIL_HOST_LINK}/${config.SITE_IMAGE}`
          })
        }
        let validUser = await userModel.findOne({ sVerificationToken: req.params.sVerificationToken })
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
