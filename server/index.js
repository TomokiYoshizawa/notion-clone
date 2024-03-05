const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();

const authRouter = require("./routes/auth");

app.use(express.json());
app.use("/auth", authRouter);

// Connecting DB
try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("connecting to DB");
} catch (err) {
  console.log(err);
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
