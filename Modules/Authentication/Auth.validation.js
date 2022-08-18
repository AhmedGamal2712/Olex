const joi = require("joi")

exports.SignUpValidator = {
    body: joi.object().required().keys({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com','net'] } }).required(),
        password: joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        cpass: joi.string().valid(joi.ref("password")).required()
    })
}

exports.SignInValidator = {
    body: joi.object().required().keys({
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com','net'] } }).required(),
        password: joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
    })
}
