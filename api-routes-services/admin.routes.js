const router = require('express').Router()
const userService = require('./user.service')
const authService = require('./auth.service')
const settingsService = require('./settings.service')
const { isAdminAuthenticated, setLanguage } = require('./middlewares/auth.middleware')
const { status, messages } = require('../api.response')

router.get('/token/verify', isAdminAuthenticated, authService.verified)
router.get('/mail/verification/:sVerificationToken', setLanguage, authService.mailVerification)
router.post('/login', setLanguage, authService.adminLogin)
router.get('/logout', isAdminAuthenticated, authService.logout)
router.post('/password/change', isAdminAuthenticated, authService.userChangePassword)
router.post('/forgot/password/mail', setLanguage, authService.forgotPasswordMail)
router.post('/forgot/password/:sVerificationToken', setLanguage, authService.forgotPassword)

router.post('/user', setLanguage, userService.store)
router.get('/user/:id', isAdminAuthenticated, userService.get)
router.put('/user/:id', isAdminAuthenticated, userService.update)
router.delete('/user/:id', isAdminAuthenticated, userService.remove)
router.post('/user/list', isAdminAuthenticated, userService.list)
router.post('/user/upload/profilepicture', isAdminAuthenticated, userService.userProfilePictureUpload)

router.get('/settings', isAdminAuthenticated, settingsService.list)
router.get('/settings/:sKey', isAdminAuthenticated, settingsService.get)
router.put('/settings/:sKey', isAdminAuthenticated, settingsService.update)
router.post('/settings', isAdminAuthenticated, settingsService.store)
router.delete('/settings/:sKey', isAdminAuthenticated, settingsService.remove)

router.all('*', (req, res) => {
  return res.status(status.BadRequest).jsonp({ message: messages['English'].route_not_found })
})

module.exports = router
