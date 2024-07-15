const userModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// handle errors
const handleErrors = (err) => {
  console.log("Error message:", err.message, "Error code:", err.code);
  let errors = { name: "", email: "", password: "" };

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "The email is already registered";
    return errors;
  }

  // validation error
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  try {
    const token = jwt.sign({ id }, "book store redux secret", {
      expiresIn: maxAge,
    });
    console.log("Token created:", token);
    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    throw error;
  }
};

module.exports.signup_get = (req, res) => {
  res.status(200).json({ Status: "Success", Page: "Sign up" });
};

module.exports.login_get = (req, res) => {
  res.status(200).json({ Status: "Success", Page: "Log in" });
};

module.exports.signup_post = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.create({ name, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id, name });
    console.log("The new user is:", user);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
    console.log("Signup error:", error);
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
      } else {
        throw Error("Incorrect password");
      }
    } else {
      throw Error("Incorrect email");
    }
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
    console.log("Login error:", error);
  }
};