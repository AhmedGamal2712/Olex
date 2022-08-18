require("dotenv").config()
const { StatusCodes } = require('http-status-codes')
const userModel = require('../../../DB/Models/User')
const jwt = require('jsonwebtoken')
const sendEmail = require('../../../Services/SendEmail')
const { catch_Error } = require('../../../Utils/CatchError')
const bcrypt = require('bcrypt')
const Qr_code = require('../../../Services/QR_Code')

//---------Sign up API ----------------
exports.SignUp = async (req, res) => {
  try {
    console.log("kkkkkkkkkkkkkkkkkkkk")
    const { firstName, lastName, email, password } = req.body
    const findUser = await userModel.findOne({ email })
    if (findUser) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'email is already exist'
      })
    } else {
      console.log(process.env.Tokenkey);
      const newuser = new userModel({ firstName, lastName, email, password })
      const saveduser = await newuser.save()
      const token = jwt.sign(
        {
          _id: saveduser._id,
          email: saveduser.email,
          role: saveduser.role
        },
        process.env.Tokenkey
      )
      console.log(token)
      const message = `<div>
        <a href='${req.protocol}://${req.headers.host}/confirmemail/${token}'>click here to confirm your email </a>
    </div>`
      console.log({message , email});
      sendEmail(email, message)
      res.status(StatusCodes.CREATED).json({ message: 'Added Done' })
    }
  } catch (error) {
    catch_Error(res, error)
  }
}
//---------Confirm Email API -----------
exports.confirm = async (req, res) => {
  try {
    const { token } = req.params
    const decoded = jwt.verify(token, process.env.Tokenkey)
    const user = await userModel
      .findOneAndUpdate(
        { email: decoded.email },
        {
          Confirmed: true,
          qrCode: '',
          $inc: { __v: 1 }
        },
        { new: true }
      )
      .select('-__v -createdAt -updatedAt')
    console.log({ user: user })
    // generate QR for each user
    Qr_code(user, userModel)
    res.status(StatusCodes.OK).json({
      message:
        'confirmation done successfully',
       
    })
  } catch (error) {
    catch_Error(res, error)
  }
}

//------------Sign in API -----------
exports.Sign_In = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'there is no account with this email , please sign UP first'
      })
    }
    if (!user.Confirmed) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Oooops!! please verfiy your account first' })
    }
    if (user.Blocked) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Oooops!!this account is blocked by admin you cannot sign in'
      })
    }
    if (user.IsDeleted) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Oooops!! this account is marked as deleted' })
    }
    const mactch = await bcrypt.compare(password, user.password)
    console.log(mactch)
    if (mactch) {
      const token = jwt.sign(
        { _id: user._id, email: user.email, role: user.role, isLoggedIn: true },
        process.env.Tokenkey
      )
      await userModel.updateOne({ email }, { Status: 'Online' })
      res
        .status(StatusCodes.OK)
        .json({ message: 'Sign in success', Token: token })
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'email or password is invalid' })
    }
  } catch (error) {
    catch_Error(res, error)
  }
}

//------------Sign Out API ---------
exports.Sign_Out = async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { email: req.user.email },
      {
        Status: 'Offline',
        Last_Seen: Date.now()
      },
      {
        new: true
      }
    )
    res.status(StatusCodes.OK).json({
      message: 'Sign Out success',
      Last_Seen: user.Last_Seen,
      Status: user.Status
    })
  } catch (error) {
    catch_Error(res, error)
  }
}
