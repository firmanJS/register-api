const { validationResult } = require('express-validator')
const { customResponse } = require('../utils')

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const messages = {
      error: 'Please provide *** fields.',
      val: errors.array()
    }
    return customResponse(res, messages, 400)
  }

  return next()
}

module.exports = {
  validateMiddleware
}
