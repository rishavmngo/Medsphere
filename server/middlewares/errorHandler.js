function programmerErrorHandler(error, req, res, next) {
  if (error.isOperational) {
    next(error)
  }

  console.error(error)
  res.status(error.statusCode).send('Internal server error')
}

function operationalErrorHandler(error, req, res, next) {
  res.status(error.statusCode).send(error)
}

module.exports = { programmerErrorHandler, operationalErrorHandler }
