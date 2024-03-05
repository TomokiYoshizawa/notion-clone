const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
  const password = req.body.password;
  try {
    // Encrypting the password
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.CRYPT_SECRET_KEY
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
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validating the user in the database
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        errors: {
          param: "username",
          message: "Invalid username",
        },
      });
    }

    // Confirm if the password is correct
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPT_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
      return res.status(401).json({
        errors: {
          param: "password",
          message: "Invalid password",
        },
      });
    }

    // Issuing JWT
    const token = JWT.sign(
      {
        id: user._id,
      },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "24h" }
    );
    return res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
