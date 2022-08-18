const { Roles } = require('../../Middelwares/auth')

exports.endPoint = {
 Add_Product: [Roles.User , Roles.Admin],
 Update_Product: [Roles.User],
 Delete_Product:[Roles.User , Roles.Admin],
 Soft_Delete: [Roles.Admin],
 Hide_Product:[Roles.User , Roles.Admin],
 Add_Product_wishlist:[Roles.User , Roles.Admin],
 Like_Product:[Roles.User , Roles.Admin]
}
