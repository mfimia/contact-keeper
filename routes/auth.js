const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

// @route   GET api/auth
// desc     Get logged in user
// @access  Private
// To protect the route, we just pass "auth" as second parameter
router.get("/", auth, async (req, res) => {
  try {
    // Because we included "auth" as second parameter, we can access the id from "req.user.id"
    const user = await User.findById(req.user.id).select("-password");
    // The server sends back the user in json format
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// This is where we validate the login info that user sends
// @route   POST api/auth
// desc     Get logged in user
// @access  Private
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      // With compare method of bcrypt we check if the passwords are the same
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      // If everything is ok, we will get the user id
      const payload = {
        user: {
          id: user.id,
        },
      };

      // JWT generated based on string we created at default.json
      // We imported config at the beginning of the file and we get now the sign from "jwtSecret"
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
