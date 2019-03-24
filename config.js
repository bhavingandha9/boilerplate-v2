require('dotenv').config()
console.log(process.env.NODE_ENV)
const dev = {
  HOST_URL: 'http://localhost',
  FRONTEND_URL: 'http://localhost',
  MAIL_HOST_LINK: 'http://localhost:3000',
  SITE_NAME: 'Boilerplate',
  SITE_IMAGE: 'Logo.png',
  PORT: 3000,
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/',
  JWT_VALIDITY: '20d',
  JWT_SECRET: process.env.JWT_SECRET || 'aAbBcC@test_123',
  MAIL_TRANSPORTER: {
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.SMTP_USERNAME || 'example@gmail.com', // SMTP email
      pass: process.env.SMTP_PASSWORD || 'example@123' // Your password
    },
    secure: true
  },
  SMTP_FROM: 'Boilerplate',
  FACEBOOK_API_URL: 'https://graph.facebook.com/v2.10/',
  GOOGLE_API_URL: 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=',
  LOGIN_HARD_LIMIT: 1, // 0 = unlimited
  PUBLIC_EMAIL_BLOCK: true,
  EMAIL_TEMPLATE_PATH: 'views/email_templates/',
  PROFILE_PICTURE_PATH: '/profilepictures',
  ONE_SIGNAL_URL: 'https://onesignal.com/api/v1/notifications',
  ONE_SIGNAL_APP_ID: process.env.ONE_SIGNAL_APP_ID || '',
  ONE_SIGNAL_REST_KEY: process.env.ONE_SIGNAL_REST_KEY || '',
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || 'your aws access key',
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || 'your aws secretAccessKey',
  S3_BUCKET_NAME: 'temp-temp',
  S3_BUCKET_URL: 'https://s3.ap-south-1.amazonaws.com/temp-bucket/',
  MANGOPAY_CLIENTID: 'bhavin123',
  MANGOPAY_URL: 'https://api.sandbox.mangopay.com/v2.01/',
  MANGOPAY_TOKEN: process.env.MANGOPAY_TOKEN || '',
  MANGOPAY_FEES_FIXED: 0.18,
  MANGOPAY_FEES_PERCENTAGE: 1,
  ADMIN_FEES_PERCENTAGE: 0,
  ADMIN_FEES_FIXED: 0,
  CONTACT_EMAIL: 'admin@boilerplate.com'
}

const prod = {
  HOST_URL: 'http://localhost',
  FRONTEND_URL: 'http://localhost',
  MAIL_HOST_LINK: 'http://localhost:3000',
  SITE_NAME: 'Boilerplate',
  SITE_IMAGE: 'Logo.png',
  PORT: 3000,
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/',
  JWT_VALIDITY: '20d',
  JWT_SECRET: process.env.JWT_SECRET || 'aAbBcC@test_123',
  MAIL_TRANSPORTER: {
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.SMTP_USERNAME || 'example@gmail.com', // SMTP email
      pass: process.env.SMTP_PASSWORD || 'example@123' // Your password
    },
    secure: true
  },
  SMTP_FROM: 'Boilerplate',
  FACEBOOK_API_URL: 'https://graph.facebook.com/v2.10/',
  GOOGLE_API_URL: 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=',
  LOGIN_HARD_LIMIT: 1, // 0 = unlimited
  PUBLIC_EMAIL_BLOCK: true,
  EMAIL_TEMPLATE_PATH: 'views/email_templates/',
  PROFILE_PICTURE_PATH: '/profilepictures',
  ONE_SIGNAL_URL: 'https://onesignal.com/api/v1/notifications',
  ONE_SIGNAL_APP_ID: process.env.ONE_SIGNAL_APP_ID || '',
  ONE_SIGNAL_REST_KEY: process.env.ONE_SIGNAL_REST_KEY || '',
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || 'your aws access key',
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || 'your aws secretAccessKey',
  S3_BUCKET_NAME: 'temp-temp',
  S3_BUCKET_URL: 'https://s3.ap-south-1.amazonaws.com/temp-bucket/',
  MANGOPAY_CLIENTID: 'bhavin123',
  MANGOPAY_URL: 'https://api.sandbox.mangopay.com/v2.01/',
  MANGOPAY_TOKEN: process.env.MANGOPAY_TOKEN || '',
  MANGOPAY_FEES_FIXED: 0.18,
  MANGOPAY_FEES_PERCENTAGE: 1,
  ADMIN_FEES_PERCENTAGE: 0,
  ADMIN_FEES_FIXED: 0,
  CONTACT_EMAIL: 'admin@boilerplate.com'
}
module.exports = (process.env.NODE_ENV === 'production') ? prod : dev
