const express = require('express')
const router = express.Router()
const appointments = require('./appointments.controller')
const jwt = require('../../middlewares/jwt')
const db = require('../../db/db.js')
const AppError = require('../../utils/AppError')

router.post('/add', jwt.verify, appointments.add)
router.get('/getAll', jwt.verify, appointments.getAll)
router.post('/getAllByDate', jwt.verify, appointments.getAllByDate)

router.post('/getByDoctor', jwt.verify, appointments.getByDoctor)
router.post('/getByOrg', jwt.verify, appointments.getByOrg)
router.post('/getByDoctorAndDate', jwt.verify, appointments.getByDoctorAndDate)

router.get('/has/:substring', async (req, res) => {
  console.log('hey')
  const substring = req.params.substring
  const query = {
    text: 'select uid,displayname,department.name as departmentname,age from users left join department on users.department_id  = department.id  where is_organisation=false and LOWER(displayname) like $1 or LOWER(department.name) like $1',
    values: [`%${substring.toLowerCase()}%`],
  }
  try {
    const result = await db.query(query)
    const { rows } = result
    console.log(rows)
    res.send(rows)
  } catch (error) {
    console.log(error)
    res.send([])
  }
})

router.post(
  '/getByOrgDoctorAndDate',
  jwt.verify,
  appointments.getByOrgDoctorAndDate
)

module.exports = router
