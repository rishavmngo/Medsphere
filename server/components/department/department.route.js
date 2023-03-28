const express = require('express')
const router = express.Router()
const department = require('./department.controller')
const jwt = require('../../middlewares/jwt')
const { validate } = require('../../middlewares/schemaValidator')
const {
  updateDepartmentSchema,
  deleteDepartmentSchema,
} = require('./department.schema')

router.get('/getAll', jwt.verify, department.getAll)
router.post('/add', jwt.verify, department.add)
router.put('/update', validate(updateDepartmentSchema), department.update)
router.delete('/delete/:id', department.delete)

module.exports = router
