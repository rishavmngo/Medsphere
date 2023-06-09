const express = require('express')
const app = express()
const cors = require('cors')
const ppdf = require('wkhtmltopdf')
const {
  programmerErrorHandler,
  operationalErrorHandler,
} = require('./middlewares/errorHandler.js')
const authRoute = require('./components/auth/auth.routes')
const usersRoute = require('./components/users/users.route')
const departmentRoute = require('./components/department/department.route')
const patientsRoute = require('./components/patients/patients.route.js')
const appointmentsRoute = require('./components/appointments/appointments.route')
const inventoryRoute = require('./components/inventory/inventory.route.js')
const prescriptionRoute = require('./components/prescription/prescription.route.js')
const uploadRoute = require('./components/upload/upload.route.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('welcome to medsphere api')
})

app.get('/pdf', (req, res) => {
  res.send('welcome to pdf')
})

app.use('/static', express.static('Images'))
app.use('/auth', authRoute)
app.use('/users', usersRoute)
app.use('/department', departmentRoute)
app.use('/patients', patientsRoute)
app.use('/appointments', appointmentsRoute)
app.use('/inventory', inventoryRoute)
app.use('/prescription', prescriptionRoute)
app.use('/upload', uploadRoute)
app.use(programmerErrorHandler)
app.use(operationalErrorHandler)

module.exports = app
