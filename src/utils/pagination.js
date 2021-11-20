const {
  LIMIT, OFFSET
} = require('./constant')

const extractSearch = (req) => {
  let search

  if (req?.query?.q) {
    search = { name: { $regex: `.*${req.query.q}.*` } }
  } else {
    search = {}
  }

  return search
}

const paging = (req) => {
  let search
  try {
    search = extractSearch(req)
  } catch (error) {
    return error
  }
  const sort = req.query.sb || 'asc'
  const order = req.query.ob || 'name'
  const limit = +req.query.lt || LIMIT
  const offset = +req.query.of || OFFSET

  return {
    search, sort, limit, offset, order
  }
}

module.exports = {
  paging
}
