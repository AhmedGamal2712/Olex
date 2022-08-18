const { auth } = require('../../Middelwares/auth')
const { validation } = require('../../Middelwares/validation')
const { endPoint } = require('./Auth.endpoints')
const { SignUpValidator, SignInValidator } = require('./Auth.validation')
const { SignUp, confirm, Sign_In, Sign_Out } = require('./controller/AUthController')

const router = require('express').Router()

router.post('/auth/signup', validation(SignUpValidator), SignUp)
router.get('/confirmemail/:token', confirm)
router.post("/auth/signin", validation(SignInValidator) , Sign_In)
router.patch("/auth/signout",auth(endPoint.Sign_Out), Sign_Out)


module.exports = router
