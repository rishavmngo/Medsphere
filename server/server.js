const app = require('./app.js')
const config = require('./config/config.js')

const PORT = config.SERVER_PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
