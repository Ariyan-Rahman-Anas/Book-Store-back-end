const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum Password length is 6 character"],
    },
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.model("users", userSchema)
module.exports = userModel