const { Roles } = require('../../Middelwares/auth')

exports.endPoint = {
  Update_Password: [Roles.User],
  Update_profile: [Roles.User],
  forget_password: [Roles.User],
  Delete_User:[Roles.Admin , Roles.User],
  Soft_Delete:[Roles.Admin],
  add_profile_pic:[Roles.User],
  add_cover_pic:[Roles.User]
}
