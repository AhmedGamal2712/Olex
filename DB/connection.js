const mongoose = require("mongoose")


exports.connectionDB = ()=>{
    return mongoose
    .connect(process.env.CONNECTION_URL)
    .then((res)=> console.log("DB connected success"))
    .catch((err)=> console.log("DB connected fail"))
}