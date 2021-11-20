const express = require('express')
const user = require('../api/user/UserController')
const { registerValidation, updatedValidation } = require('../middleware/validation/user_validation')
const { verifyToken } = require('../middleware')

const router = express.Router()

router.post('/user/register', verifyToken, registerValidation, (req, res) => {
  user.store(req, res)
})

router.patch('/user', verifyToken, updatedValidation, (req, res) => {
  user.update(req, res)
})

router.get('/user/:user_id', verifyToken, (req, res) => {
  user.show(req, res)
})

module.exports = router
