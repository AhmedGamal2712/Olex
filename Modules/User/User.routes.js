const { auth } = require('../../Middelwares/auth')
const { validation } = require('../../Middelwares/validation')
const { my_multer, fileExtensions } = require('../../Services/multer')
const {
  Update_password,
  Update_profile,
  forget_password,
  Reset_Password,
  deleteUser,
  SoftdeleteUser,
  addprofilePicture,
  addcoverPicture,
  get_all_users
} = require('./controller/User_Controller')
const { endPoint } = require('./User.endpoints')
const {
  UpdatePasswordValidator,
  UpdateProfileValidator,
  ResetPasswordValidator,
  SoftDeleteValidator
} = require('./User.validation')

const router = require('express').Router()

router.patch(
  '/user/update_pass',
  auth(endPoint.Update_Password),
  validation(UpdatePasswordValidator),
  Update_password
)

router.patch(
  '/user/update_profile',
  auth(endPoint.Update_profile),
  validation(UpdateProfileValidator),
  Update_profile
)

router.patch('/user/forget_pass', forget_password)
router.post(
  '/user/reset_pass',
  validation(ResetPasswordValidator),
  Reset_Password
)
router.delete('/user/delete_user', auth(endPoint.Delete_User), deleteUser)
router.patch(
  '/user/softdelete',
  auth(endPoint.Soft_Delete),
  validation(SoftDeleteValidator),
  SoftdeleteUser
)
router.patch(
  '/user/add_profile_pic',
  auth(endPoint.add_profile_pic),
  my_multer('Users/profie_Pic', fileExtensions.ImageEX).array('image', 2),
  addprofilePicture
)
router.patch(
    '/user/add_cover_pic',
    auth(endPoint.add_cover_pic),
    my_multer('Users/Cover_Pic', fileExtensions.ImageEX).array("image" , 2),
    addcoverPicture
)

router.get("/users" , get_all_users)
module.exports = router
