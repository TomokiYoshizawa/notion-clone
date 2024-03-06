const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema({
  user: {
    type: Schema.types.ObjectId,
    ref: "User",
    required: true,
  },
  icon: {
    type: String,
    default: "📝",
  },
  title: {
    type: String,
    default: "title",
  },
  description: {
    type: String,
    default: "write your memo!",
  },
  position: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoritePosition: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Memo", memoSchema);
