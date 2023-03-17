const dotenv = require('dotenv').config()

const config = {
  SERVER_PORT: process.env.SERVER_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
}

module.exports = config
