const { Roles } = require('../../Middelwares/auth')

exports.endPoint = {
  Add_Comment: [Roles.User, Roles.Admin],
  Add_Reply: [Roles.User, Roles.Admin],
  Update_Comment: [Roles.User],
  Delete_Comment: [Roles.User, Roles.Admin],
  like_Comment: [Roles.User, Roles.Admin]
}
