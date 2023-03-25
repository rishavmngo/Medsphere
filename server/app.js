const express = require('express')
const app = express()
const cors = require('cors')
const {
  programmerErrorHandler,
  operationalErrorHandler,
} = require('./middlewares/errorHandler.js')
const authRoute = require('./components/auth/auth.routes')
const usersRoute = require('./components/users/users.route')
const departmentRoute = require('./components/department/department.route')
const patientsRoute = require('./components/patients/patients.route.js')

app.use(cors())
app.use(express.json())

app.use('/auth', authRoute)
app.use('/users', usersRoute)
app.use('/department', departmentRoute)
app.use('/patients', patientsRoute)

app.use(programmerErrorHandler)
app.use(operationalErrorHandler)

module.exports = app
