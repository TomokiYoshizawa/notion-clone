const router = require("express").Router();
const User = require("../src/models/user");
const { body, validationResult } = require("express-validator");
const validation = require("../src/handlers/validation");
const userController = require("../src/controllers/userController");
const tokenHandler = require("../src/handlers/tokenHandler");
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
  validation.validate,
  userController.register
);

//login API
router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("Username must be at least 8 characters long"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  validation.validate,
  userController.login
);

//JWT token verification
router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;
