const joi = require('joi')

exports.AddCommentValidator = {
  body: joi
    .object()
    .required()
    .keys({
      comment_body: joi.string().required(),
      Product_id: joi
        .string()
        .max(24)
        .min(24)
        .required()
    })
}
exports.AddReplyValidator = {
  body: joi
    .object()
    .required()
    .keys({
      comment_body: joi.string().required(),
      Comment_id: joi
        .string()
        .max(24)
        .min(24)
        .required()
    })
}
exports.UpdateCommentValidator = {
  body: joi
    .object()
    .required()
    .keys({
      comment_body:joi.string().required(),
      _id: joi
        .string()
        .max(24)
        .min(24)
        .required()
    })
}

exports.DeleteCommentValidator = {
  body: joi
    .object()
    .required()
    .keys({
      _id: joi
        .string()
        .max(24)
        .min(24)
        .required()
    })
}

exports.LikeCommentValidator = {
  params: joi
    .object()
    .required()
    .keys({
      _id: joi
        .string()
        .max(24)
        .min(24)
        .required()
    })
}
