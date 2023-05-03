const inventoryDb = require('./inventory.model')
const inventory = {}

inventory.getMedicineByOrgId = (req, res) => {
  res.send('hello there')
  inventoryDb.getMedicinebyOrgId(orgId)
}

module.exports = inventory
