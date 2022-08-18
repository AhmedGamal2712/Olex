const { Roles } = require("../../Middelwares/auth");



exports.endPoint = {
    Sign_Out:[Roles.User]
}