const express = require("express");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const User = require("./src/models/user");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;

// Connecting DB
try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("connecting to DB");
} catch (err) {
  console.log(err);
}

app.post("/register", async (req, res) => {
  const password = req.body.password;
  try {
    // Encrypting the password
    req.body.password = CryptoJS.AES.encrypt(
      "password",
      process.env.SECRET_KEY
    );

    // Creating a new user
    const user = await User.create(req.body);
  } catch (err) {
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
