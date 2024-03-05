const router = require("express").Router();
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("../src/models/user");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

router.post(
  "/register",
  //validating the request
  body("username")
    .isLength({ min: 8 })
    .withMessage("Username must be at least 8 characters long"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("Confirm Password must be at least 8 characters long"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("this username already in use");
      }
    });
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const password = req.body.password;
    try {
      // Encrypting the password
      req.body.password = CryptoJS.AES.encrypt(
        "password",
        process.env.SECRET_KEY
      );

      // Creating a new user
      const user = await User.create(req.body);

      // Creating a JWT token
      const token = JWT.sign(
        {
          id: user._id,
        },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "24h" }
      );
      return res.status(200).json({ user, token });
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
