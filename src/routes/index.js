const express = require('express')

const routing = express()
const user = require('./UserRoute')

routing.use(user)

module.exports = routing
