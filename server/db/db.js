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

// pool.query('Drop Database medsphere;', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

// pool.connect((err, client, done) => {
//   if (err) throw new AppError('Databse Error', 502, err.message, false)
//   client.query(
//     `CREATE TABLE IF NOT EXISTS users (
//  	uid serial PRIMARY KEY,
//  	displayName varchar(50) NOT NULL,
//  	email varchar(100) NOT NULL UNIQUE,
//  	password varchar(300) NOT NULL
//  	)`,
//     (err, res) => {
//       done()
//       if (err) throw new AppError('Databse Error', 502, err.message, false)
//       // console.log('Table created successfully')
//     }
//   )
module.exports = pool
