const { check } = require('express-validator')
const { validateMiddleware } = require('../validation')
require('dotenv').config()

const registerValidation = [
  check('name').isString().not().isEmpty()
    .withMessage('required value'),
  check('address').isString().not().isEmpty()
    .withMessage('required value'),
  check('email').isString().not().isEmpty()
    .withMessage('required value')
    .isEmail()
    .withMessage('invalid email type'),
  check('password').isString().not().isEmpty()
    .withMessage('required value'),
  check('photos').not()
    .isEmpty()
    .isArray()
    .withMessage('required value'),
  check('creditcard_type').isString().not().isEmpty()
    .withMessage('required value'),
  check('creditcard_number').isString().not().isEmpty()
    .withMessage('required value'),
  check('creditcard_name').isString().not().isEmpty()
    .withMessage('required value'),
  check('creditcard_expired').isString().not().isEmpty()
    .withMessage('required value'),
  check('creditcard_ccv').isString().not().isEmpty()
    .withMessage('required value'),
  (req, res, next) => { validateMiddleware(req, res, next) }
]

const updatedValidation = [
  check('user_id').isNumeric().not().isEmpty()
    .withMessage('required value'),
  check('email').isEmail()
    .withMessage('invalid email type'),
  check('password').isString().not().isEmpty()
    .withMessage('required value'),
  check('creditcard_type').isString().not().isEmpty()
    .withMessage('required value'),
  check('creditcard_number').isString().not().isEmpty()
    .withMessage('required value'),
  check('creditcard_name').isString().not().isEmpty()
    .withMessage('required value'),
  check('creditcard_expired').isString().not().isEmpty()
    .withMessage('required value'),
  check('creditcard_ccv').isString().not().isEmpty()
    .withMessage('required value'),
  (req, res, next) => { validateMiddleware(req, res, next) }
]

module.exports = { registerValidation, updatedValidation }
