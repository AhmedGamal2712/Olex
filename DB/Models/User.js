const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User_Schema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    Profile_picture: [String],
    Cover_pictures: [String],
    Qr_code: String,
    Confirmed: { type: Boolean, default: false },
    Blocked: { type: Boolean, default: false },
    WishList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    IsDeleted: { type: Boolean, default: false },
    qrCode: { type: String, default: '' },
    role: { type: String, default: 'User' },
    Status:{ type: String, default: 'Offline' },
    Last_Seen:Date,
    code:{ type: String, default: '' },
    socketId:{ type: String, default: '' }
  },
  {
    timestamps: true
  }
)

User_Schema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    parseInt(process.env.saltRounds)
  )
  next()
})

const userModel = mongoose.model('User', User_Schema)

module.exports = userModel
