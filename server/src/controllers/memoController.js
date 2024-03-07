const Memo = require("../models/memo");

exports.create = async (req, res) => {
  try {
    const memoCount = await Memo.find().count();
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch {
    res.status(500).json(err);
  }
};

exports.getALL = async (req, res) => {
  try {
    const memos = await Memo.find({ user: req.user._id }).sort("-position");
    res.status(200).json(memos);
  } catch {
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json({ message: "Memo not found" });
    res.status(200).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};
