const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SettingsSchema = new Schema({
  sKey: { type: String },
  sValue: { type: String },
  sTitle: { type: String },
  dUpdatedAt: { type: Date },
  dCreatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('settings', SettingsSchema)
