const express = require('express')
const router = express.Router()
const user = require('./users.controller')
const jwt = require('../../middlewares/jwt')

router.get('/get', jwt.verify, user.get)
router.put('/update', jwt.verify, user.updateOne)
router.get('/getAllDoctors', jwt.verify, user.getAllDoctors)
router.get('/has/:substring', jwt.verify, user.getBySubstring)
router.delete('/deleteById/:uid', jwt.verify, user.deleteById)

module.exports = router
