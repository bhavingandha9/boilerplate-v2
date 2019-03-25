const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
const config = require('./../config')
const Schema = mongoose.Schema

const Users = new Schema({
  sEmail: { type: String, trim: true },
  sMobileNumber: { type: String, trim: true },
  sCountryCode: { type: String, trim: true },
  sPassword: { type: String, trim: true },
  eType: { type: String, enum: ['user', 'admin'], default: 'user' },
  eStatus: { type: String, enum: ['y', 'n', 'b', 'd'], default: 'n' },
  eGender: { type: String, enum: ['male', 'female'] },
  sProfilePicture: { type: String, trim: true },
  aJwtTokens: [{
    sToken: { type: String },
    sIpAddres: { type: String },
    sPushToken: { type: String, trim: true },
    dTimeStamp: { type: Date, default: Date.now }
  }],
  sVerificationToken: { type: String },
  dUpdatedAt: { type: Date },
  dCreatedAt: { type: Date, default: Date.now }
})

Users.pre('save', function (next) {
  var user = this
  if (user.isModified('sPassword')) {
    user.sPassword = bcrypt.hashSync(user.sPassword, salt)
  }
  next()
})

Users.statics.filterData = function (user) {
  user.eStatus = undefined
  user.eType = undefined
  user.__v = undefined
  user.sPassword = undefined
  user.sVerificationToken = undefined
  user.aJwtTokens = undefined
  return user
}

Users.statics.findByToken = function (token) {
  var User = this
  var decoded
  try {
    decoded = jwt.verify(token, config.JWT_SECRET)
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject(e)
    })
  }
  var query = {
    '_id': decoded._id,
    'aJwtTokens.sToken': token
  }
  return User.findOne(query)
}

module.exports = mongoose.model('users', Users)
