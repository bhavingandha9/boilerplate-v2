/**
 * Auth middleware containes the common methods to authenticate user or admin by token.
 * @method {isAdminAuthenticated} is for authenticating the token and make sure its a admin.
 * @method {isUserAuthenticated} is for authenticating the token.
 * @method {findByToken} is specified in user.model.js
 */
const userModel = require('./../../models/users.model')
const { messages, status } = require('./../../api.response.js')
const { catchError } = require('./../utilities.service')

const isAdminAuthenticated = (req, res, next) => {
  try {
    let token = req.header('Authorization')
    let lang = req.header('Language')
    if (lang === 'English') {
      req.userLanguage = 'English'
    } else {
      req.userLanguage = 'English'
    }
    if (token) {
      userModel.findByToken(token).then((user) => {
        if (!user) {
          return res.status(status.Unauthorized).jsonp({
            message: messages[req.userLanguage].err_unauthorized
          })
        }

        if (user.eType === 'admin' && user.eStatus === 'y') {
          req._id = user._id
          req.user = user
          return next(null, null)
        } else if (user.eStatus === 'b' || user.eStatus === 'd') {
          return res.status(status.Unauthorized).jsonp({ message: messages[req.userLanguage].user_blocked })
        } else if (user.eStatus === 'n') {
          return res.status(status.Unauthorized).jsonp({ message: messages[req.userLanguage].user_not_verified })
        } else {
          return res.status(status.Unauthorized).jsonp({ message: messages[req.userLanguage].err_unauthorized })
        }
      }).catch(error => {
        return catchError('isAdminAuthenticated', error, req, res)
      })
    } else {
      return res.status(status.Unauthorized).jsonp({ message: messages[req.userLanguage].err_unauthorized })
    }
  } catch (error) {
    return catchError('isAdminAuthenticated', error, req, res)
  }
}

const isUserAuthenticated = (req, res, next) => {
  try {
    let token = req.header('Authorization')
    let lang = req.header('Language')
    if (lang === 'English') {
      req.userLanguage = 'English'
    } else {
      req.userLanguage = 'English'
    }
    if (token) {
      userModel.findByToken(token).then(user => {
        if (!user) {
          return res.status(status.Unauthorized).jsonp({ message: messages[req.userLanguage].err_unauthorized })
        }
        if (user.eStatus === 'b' || user.eStatus === 'd') {
          return res.status(status.Unauthorized).jsonp({ message: messages[req.userLanguage].user_blocked })
        } else if (user.eStatus === 'n') {
          return res.status(status.Unauthorized).jsonp({ message: messages[req.userLanguage].user_not_verified })
        } else {
          req._id = user._id
          req.user = user
          return next(null, null)
        }
      }).catch(error => {
        return catchError('isUserAuthenticated', error, req, res)
      })
    } else {
      return res.status(status.Unauthorized).jsonp({ message: messages[req.userLanguage].err_unauthorized })
    }
  } catch (error) {
    return catchError('isUserAuthenticated', error, req, res)
  }
}

const setLanguage = (req, res, next) => {
  let lang = req.header('Language')
  if (lang === 'English') {
    req.userLanguage = 'English'
  } else {
    req.userLanguage = 'English'
  }
  return next()
}

module.exports = {
  isAdminAuthenticated,
  isUserAuthenticated,
  setLanguage
}
