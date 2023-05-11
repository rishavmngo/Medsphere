const { Pool, Client } = require('pg')
const config = require('../config/config')
const AppError = require('../utils/AppError')

const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
})

module.exports = pool
