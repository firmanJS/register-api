const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const { Schema } = mongoose

const UserSchema = new Schema({
  user_id: { type: Number },
  name: { type: String },
  address: { type: String },
  email: { type: String },
  password: { type: String, index: true },
  photos: { type: Array },
  creditcard: {
    type: { type: String },
    number: { type: String },
    name: { type: String },
    expired: { type: String },
    cvv: { type: String }
  }
}, { timestamps: true })

UserSchema.methods.toJSONFor = () => ({
  user_id: this.user_id,
  name: this.name,
  email: this.email,
  address: this.address,
  photos: this.photos,
  credit_card: this.credit_card
})
UserSchema.plugin(AutoIncrement, { inc_field: 'user_id' })

module.exports = mongoose.model('User', UserSchema)
