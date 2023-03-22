function programmerErrorHandler(error, req, res, next) {
  console.error(error)

  if (error.isOperational) {
    return next(error)
  }

  return res.status(error.statusCode).send('Internal server error')
}

function operationalErrorHandler(error, req, res, next) {
  const { isOperational, ...restError } = error
  return res.status(error.statusCode).send(restError)
}

module.exports = { programmerErrorHandler, operationalErrorHandler }
