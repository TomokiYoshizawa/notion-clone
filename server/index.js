const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8085;

const authRouter = require("./routes/authRoute");
const memoRouter = require("./routes/memoRoute");

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/memo", memoRouter);

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
