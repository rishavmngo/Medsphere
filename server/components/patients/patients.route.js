const express = require('express')
const router = express.Router()
const patients = require('./patients.controller')
const jwt = require('../../middlewares/jwt')

router.get('/getAll', jwt.verify, patients.getAll)

router.post('/add', jwt.verify, patients.add)

router.put('/updateById/:patientId', jwt.verify, patients.updateById)

router.delete('/deleteById/:patientId', jwt.verify, patients.deleteById)

router.get('/has/:substring', jwt.verify, patients.getBySubstring)

module.exports = router
