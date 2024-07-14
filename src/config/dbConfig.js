const mongoose = require("mongoose")

function dbConfig() {
    mongoose.connect(`${process.env.DB_URI}`)
        .then(() => console.log("MongoDB is Connected!"))
    .catch((error)=>console.log("MongoDB connecting error is: ", error))
}
module.exports = dbConfig