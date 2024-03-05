const express = require("express");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("./src/models/user");
const app = express();
const { body } = require("express-validator");
const PORT = process.env.PORT || 8080;
require("dotenv").config();

app.use(express.json());

// Connecting DB
try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("connecting to DB");
} catch (err) {
  console.log(err);
}

app.post(
  "/register",
  body("username")
    .isLength({ min: 8 })
    .withMessage("Username must be at least 8 characters long"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("conrfirmPassword")
    .isLength({ min: 8 })
    .withMessage("ConfirmPassword must be at least 8 characters long"),
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

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
