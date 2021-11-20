const { customResponse } = require('../utils')

const verifyToken = async (req, res, next) => {
  if (req?.headers?.key) {
    if (req?.headers?.key === process.env.API_KEY) {
      return next()
    }
    const message = { error: 'Invalid API key.' }
    return customResponse(res, message, 401)
  }
  const message = { error: 'API key is missing.' }
  return customResponse(res, message, 403)
}

module.exports = { verifyToken }
