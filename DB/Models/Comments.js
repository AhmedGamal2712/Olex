const mongoose = require('mongoose')

const Comment_Schema = new mongoose.Schema(
  {
    comment_body: String,
    comment_By: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    Replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    // Picture:[String],
    Likes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    Comment_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  },
  {
    timestamps: true
  }
)

const CommModel = mongoose.model('Comment', Comment_Schema)

module.exports = CommModel
