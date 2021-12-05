const express = require("express");
const router = express.Router();
// Using a validator from express to make sure people send the right data (npm installed)
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

// @route   POST api/users
// desc     Register a user
// @access  Public
router.post(
  "/",
  // These are all the validations. We check that name is not empty, email is email, and password has min length 6
  // It will not let us do the post action if the validation is not successful
  [
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("passed");
  }
);

module.exports = router;
