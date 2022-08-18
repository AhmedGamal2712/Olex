const joi = require('joi')
 
exports.AddProductValidator = {
  body: joi
    .object()
    .required()
    .keys({
      Product_title: joi.string().required(),
      Product_desc:joi.string().required(),
      Product_price: joi.number().required(),
    })
}
exports.UpdateProductValidator = {
  body: joi
    .object()
    .required()
    .keys({
      Product_title: joi.string().optional(),
      Product_desc:joi.string().optional(),
      Product_price: joi.number().optional(),
      _id:joi.string().max(24).min(24).required()
    })
}

exports.DeleteProductValidator = {
  body: joi
    .object()
    .required()
    .keys({
      _id:joi.string().max(24).min(24).required()
    })
}

exports.HideProductValidator = {
  body: joi
    .object()
    .required()
    .keys({
      _id:joi.string().max(24).min(24).required()
    })
}

exports.LikeProductValidator = {
  params: joi
    .object()
    .required()
    .keys({
      _id:joi.string().max(24).min(24).required()
    })
}