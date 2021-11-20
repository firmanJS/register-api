const Users = require('../../models/UserModel')
const { paging, customResponse } = require('../../utils')

const message = {
  error: 'Something went wrong. Please try again later.'
}

const select = ['user_id', 'name', 'email', 'address', 'photos', 'creditcard']
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
    customResponse(res, message, 500)
  }
}

const show = async (req, res) => {
  try {
    const user_id = +req?.params.user_id || 'NaN'
    if (user_id === 'NaN') {
      const paginate = paging(req)
      const {
        order, sort, search, limit, offset
      } = paginate

      const row = await Users.find(search, { _id: 0 }).select(select)
        .skip(offset)
        .limit(limit)
        .sort({ [order]: [sort] })
      const count = await Users.estimatedDocumentCount()
      const dataMapping = {
        count,
        row
      }
      customResponse(res, dataMapping, 200)
    } else {
      const result = await Users.find({ user_id }, { _id: 0 }).select(select)
      if (result[0]?.name) {
        result.map((r) => {
          delete r._id

          return r
        })
        customResponse(res, result, 200)
      } else {
        const messages = { error: 'User not found.' }
        customResponse(res, messages, 404)
      }
    }
  } catch (error) {
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
    customResponse(res, message, 500)
  }
}

module.exports = {
  store, show, update
}
