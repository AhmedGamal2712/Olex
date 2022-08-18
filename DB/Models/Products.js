const mongoose = require('mongoose')

const Product_Schema = new mongoose.Schema(
  {
     Product_title: String,
     Product_desc: String,
     Product_price: Number,
     Likes:[{type: mongoose.Schema.Types.ObjectId , ref:"User"}],
     CreatedBy:{type: mongoose.Schema.Types.ObjectId , ref:"User"},
     Hidden :{ type: Boolean, default: false },
     IsDeleted:{ type: Boolean, default: false },
     Comments :[{type: mongoose.Schema.Types.ObjectId , ref:"Comment"}],
     Wishlists: [{type: mongoose.Schema.Types.ObjectId , ref:"User"}],
     qrCode:{ type: String, default: "" }
  },
  {
    timestamps: true
  }
)

const productModel = mongoose.model('Product', Product_Schema)

module.exports = productModel
