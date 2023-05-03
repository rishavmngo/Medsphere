const express = require('express')
const router = express.Router()
const inventory = require('./inventory.controller')

router.get('/medicine/byOrgId', inventory.getMedicineByOrgId)

module.exports = router
