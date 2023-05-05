const express = require('express')
const router = express.Router()
const inventory = require('./inventory.controller')
const jwt = require('../../middlewares/jwt')

router.get('/medicine/byOrgId', jwt.verify, inventory.getMedicineByOrgId)
router.get(
  '/medicine/has/:substring',
  jwt.verify,
  inventory.getMedicineBySubstring
)
router.post('/medicine/add', jwt.verify, inventory.addMedicine)

router.put('/medicine/update/:medicineId', jwt.verify, inventory.updateMedicine)

router.delete(
  '/medicine/delete/:medicineId',
  jwt.verify,
  inventory.deleteMedicine
)
module.exports = router
