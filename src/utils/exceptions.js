const notFoundHandler = (req, res) => {
  const msg = `Route : ${req.url} Not found.`
  const err = new Error(msg)
  res.status(404).json({
    error: err.toString(),
    status: 404,
    msg,
  })
}

const errorHandler = (error, res) => {
  if (!error.statusCode) error.statusCode = 500
  res.status(error.statusCode).json({
    error: 'Something went wrong. Please try again later.'
  })
}

const customResponse = (res, message, code) => {
  res.status(code).json(message)
}

module.exports = {
  notFoundHandler,
  errorHandler,
  customResponse
}
