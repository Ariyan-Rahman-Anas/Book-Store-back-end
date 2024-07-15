const mongoose = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: false,
      required: [true, "Please enter your name"],
      minlength: [3, "The length of user name can be minimum of 3 character"],
      maxlength: [25, "The length of user name can be maximum of 25 character"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter an valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum Password length is 6 character"],
    },
  },
  { timestamps: true, versionKey: false }
);


//fire a function before doc save to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
} )

const userModel = mongoose.model("users", userSchema)
module.exports = userModel