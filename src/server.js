/* eslint-disable no-console */
const app = require('./app')

require('dotenv').config()

let server

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  console.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  console.info('SIGTERM received')
  if (server) {
    server.close()
  }
})

app.listen(process.env.APP_PORT, () => {
  console.info(`app running in port ${process.env.APP_PORT}`)
})
