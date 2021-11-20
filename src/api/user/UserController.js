const Users = require('../../models/UserModel')
const { paging, customResponse } = require('../../utils')

const store = async (input, res) => {
  try {
    const creditcard = {
      creditcard: {
        type: input.body.creditcard_type,
        name: input.body.creditcard_name,
        number: input.body.creditcard_number,
        expired: input.body.creditcard_expired,
        cvv: input.body.creditcard_cvv
      }
    }

    const data = {
      ...input.body,
      ...creditcard
    }

    const result = await Users.create(data)
    customResponse(res, { user_id: result.user_id }, 200)
  } catch (error) {
    customResponse(res, error, 500)
  }
}

const show = async (req, res) => {
  try {
    const user_id = +req?.params.user_id || 'NaN'
    if (user_id === 'NaN') {
      const paginate = paging(req)
      const row = await Users.find(paginate.where)
        .skip((paginate.limit * paginate.page) - paginate.limit)
        .limit(paginate.limit).sort(paginate.sort)
      const count = await Users.estimatedDocumentCount()
      const dataMapping = {
        count,
        row
      }
      customResponse(res, dataMapping, 200)
    } else {
      const result = await Users.find({ user_id })
      if (result[0]?.name) {
        customResponse(res, result, 200)
      } else {
        const message = { error: 'User not found.' }
        customResponse(res, message, 404)
      }
    }
  } catch (error) {
    const message = {
      error: 'Something went wrong. Please try again later.'
    }
    customResponse(res, message, 500)
  }
}

const update = async (req, res) => {
  try {
    const { user_id } = req.body

    const creditcard = {
      creditcard: {
        type: req.body.creditcard_type,
        name: req.body.creditcard_name,
        number: req.body.creditcard_number,
        expired: req.body.creditcard_expired,
        cvv: req.body.creditcard_cvv
      }
    }

    const data = {
      ...req.body,
      ...creditcard
    }

    await Users.findOneAndUpdate({ user_id },
      { $set: data }, { new: true })
    customResponse(res, { success: true }, 500)
  } catch (error) {
    const message = {
      error: 'Something went wrong. Please try again later.'
    }
    customResponse(res, message, 500)
  }
}

module.exports = {
  store, show, update
}
