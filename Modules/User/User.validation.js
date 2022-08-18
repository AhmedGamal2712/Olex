const joi = require('joi')
// tlds: top level domain options
exports.UpdatePasswordValidator = {
  body: joi
    .object()
    .required()
    .keys({
      old_password: joi
        .string()
        .required()
        .pattern(
          new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        ),
      new_password: joi
        .string()
        .required()
        .pattern(
          new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        ),
      cpass: joi
        .string()
        .valid(joi.ref('new_password'))
        .required()
    })
}

exports.UpdateProfileValidator = {
  body: joi
    .object()
    .required()
    .keys({
      firstName: joi.string().optional(),
      lastName: joi.string().optional(),
      new_email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .optional()
    })
}
exports.ResetPasswordValidator = {
  body: joi
    .object()
    .required()
    .keys({
      new_password: joi
        .string()
        .required()
        .pattern(
          new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        ),
      code: joi.string().required(),
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      cNewPass: joi
        .string()
        .valid(joi.ref('new_password'))
        .required()
    })
}
exports.SoftDeleteValidator = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
    })
}
