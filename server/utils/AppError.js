class AppError extends Error {
  constructor(name, statusCode, description, isOperational) {
    super(description)
    Error.call(this)
    Error.captureStackTrace(this)
    this.name = name
    this.statusCode = statusCode
    this.description = description
    this.isOperational = isOperational
  }
}

module.exports = AppError
