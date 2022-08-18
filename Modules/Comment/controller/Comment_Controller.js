const { StatusCodes } = require('http-status-codes')
const CommModel = require('../../../DB/Models/Comments')
const productModel = require('../../../DB/Models/Products')
const userModel = require('../../../DB/Models/User')
const { getIo, socketEvents } = require('../../../Services/socket')
const { catch_Error } = require('../../../Utils/CatchError')

//-------------Add Comment API -----------
exports.add_Comment = async (req, res) => {
  try {
    const { comment_body, Product_id } = req.body
    const findproduct = await productModel.findOne({
      _id: Product_id,
      IsDeleted: false,
      Hidden: false
    })
    if (findproduct) {
      const newcomment = new CommModel({
        comment_body,
        Product_id,
        comment_By: req.user._id
      })
      const saved = await newcomment.save()
      await productModel.findOneAndUpdate(
        { _id: findproduct._id },
        {
          $push: {
            Comments: saved._id
          }
        },
        { new: true }
      )
      // socket io inform all open users
      const socketUser = await userModel
        .findById(req.user._id)
        .select('socketId')
      console.log(socketUser)
      getIo()
        .except(socketUser.socketId)
        .emit(socketEvents.addComment, [saved])
      res.status(StatusCodes.CREATED).json({ message: 'Comment Added Done' })
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'product not found' })
    }
  } catch (error) {
    catch_Error(res, error)
  }
}

//-------------Update Comment API -----------
exports.Update_Comment = async (req, res) => {
  try {
    const { comment_body, _id } = req.body
    const modified = await CommModel.findOneAndUpdate(
      { _id, comment_By: req.user._id },
      {
        comment_body,
        $inc: { __v: 1 }
      },
      { new: true }
    )
    if (modified) {
      getIo().emit(socketEvents.updateComment, [modified])
      res.status(StatusCodes.CREATED).json({ message: 'Comment Updates Done' })
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Comment Updates fail' })
    }
  } catch (error) {
    catch_Error(res, error)
  }
}

//--------------delete comment by admin and account owner---------
exports.deleteComent = async (req, res) => {
  try {
    if (req.user.role == 'Admin') {
      await productModel.findOneAndUpdate(
        { _id: comment.Product_id },
        {
          $pull: {
            Comments: comment._id
          }
        },
        { new: true }
      )
      await CommModel.deleteOne({ _id: req.body._id })
      res.status(StatusCodes.OK).json({ message: 'Deleted Done by admin' })
    } else if (req.user.role == 'User') {
      const comment = await CommModel.findOne({
        _id: req.body._id,
        comment_By: req.user._id
      })
      if (comment) {
        await productModel.findOneAndUpdate(
          { _id: comment.Product_id },
          {
            $pull: {
              Comments: comment._id
            }
          },
          { new: true }
        )
        await CommModel.deleteOne({ _id: req.body._id })
        res.status(StatusCodes.OK).json({ message: 'Deleted Done' })
      } else {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Unauthorized user' })
      }
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'You cannot delete any comment' })
    }
  } catch (error) {
    catch_Error(res, error)
  }
}

//-----------Like and Unlike Comment API ----------
exports.likeCommment = async (req, res) => {
  try {
    const { _id } = req.params
    const Comment = await CommModel.findById(_id)

    if (!Comment) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Comment not found' }) // 404 Not Found
    }

    if (Comment.comment_By.toString() === req.user._id.toString()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'You cannot like your own comment' })
    }

    const likes = Comment.Likes.includes(req.user._id)
      ? Comment.Likes.filter(
          user => user.toString() !== req.user._id.toString()
        )
      : [...Comment.Likes, req.user._id]

    await CommModel.findByIdAndUpdate(_id, { Likes: likes }, { new: true })

    res.status(StatusCodes.OK).json({ message: 'Done' })
  } catch (error) {
    catch_Error(res, error)
  }
}

//-------------Add Reply API -----------
exports.add_Reply = async (req, res) => {
  try {
    const { comment_body, Comment_id } = req.body
    const newcomment = new CommModel({
      comment_body,
      Comment_id,
      comment_By: req.user._id
    })
    const saved = await newcomment.save()
    // console.log({saved: saved._id});
    const Comment = await CommModel.findOneAndUpdate(
      { _id: Comment_id },
      {
        $push: {
          Replies: saved._id
        }
      },
      { new: true }
    )
    // socket io inform all open users
    const socketUser = await userModel.findById(req.user._id).select('socketId')
    console.log(socketUser)
    getIo()
      .except(socketUser.socketId)
      .emit(socketEvents.addReply, [saved])
    res.status(StatusCodes.CREATED).json({ message: 'Reply Added Done' })
  } catch (error) {
    catch_Error(res, error)
  }
}
