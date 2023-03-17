const express = require('express')
const app = express()
const AppError = require('./utils/AppError.js')
const {
  programmerErrorHandler,
  operationalErrorHandler,
} = require('./middlewares/errorHandler.js')
const authRoute = require('./components/auth/auth.routes')

app.use('/auth', authRoute)

app.use(programmerErrorHandler)
app.use(operationalErrorHandler)

module.exports = app
