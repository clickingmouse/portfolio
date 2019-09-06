const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//User Model
const User = require("../../models/User");

// @route POST api/auth
// @descr Authenticate user
// @access Public
router.post("/", (req, res) => {
  //  res.send("register");

  const { name, email, password } = req.body;
  //simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //check for existing user
  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    //Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
      //
      jwt.sign(
        { id: user.id },
        process.env.REACT_APP_JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          //
          res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email }
          });
        }
      );
    });
  });
});

// @route GET api/auth/user
// @descr get user data
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
