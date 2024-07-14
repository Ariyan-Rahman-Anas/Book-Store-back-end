const userModel = require("./../model/UserModel");

module.exports.signup_get = (req, res) => {
  res.status(200).json({ Status: "Success", Page: "Sign up" });
};

module.exports.login_get = (req, res) => {
    res.status(200).json({ Status: "Success", Page: "Log in" });
}

module.exports.signup_post =async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.create({ email, password })
        res.status(201).json({ newUser: user._id })
        console.log("The new user is: ", user);
    } catch (error) {
      res.status(400).json({ error });
    }
}

module.exports.login_post = (req, res) => {
  res.status(200).json({ status: "user login" });
};