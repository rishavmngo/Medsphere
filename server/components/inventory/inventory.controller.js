const AppError = require('../../utils/AppError')
const inventoryDb = require('./inventory.model')
const inventory = {}

inventory.getMedicineByOrgId = async (req, res, next) => {
  const orgId = req.id

  try {
    const response = await inventoryDb.getMedicinebyOrgId(orgId)
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}
inventory.getMedicineBySubstring = async (req, res, next) => {
  const orgId = req.id
  const substring = req.params.substring

  console.log(orgId, substring)

  try {
    const response = await inventoryDb.getMedicineBySubstring(orgId, substring)
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}

inventory.addMedicine = async (req, res, next) => {
  const orgId = req.id

  try {
    const response = await inventoryDb.addMedicine(orgId, req.body)
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}

inventory.updateMedicine = async (req, res, next) => {
  const orgId = req.id
  const id = req.params.medicineId

  try {
    const response = await inventoryDb.updateMedicine(id, orgId, req.body)
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}

inventory.deleteMedicine = async (req, res, next) => {
  const orgId = req.id
  const id = req.params.medicineId

  try {
    const response = await inventoryDb.deleteMedicine(id, orgId)
    res.send(response.data)
  } catch (error) {
    next(new AppError('Internal sever error', 500, error.message, false))
  }
}
module.exports = inventory
