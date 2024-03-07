const router = require("express").Router();
const memoController = require("../src/controllers/memoController");
const tokenHandler = require("../src/handlers/tokenHandler");

router.post("/", tokenHandler.verifyToken, memoController.create);

// get all memos from a use logged in
router.get("/", tokenHandler.verifyToken, memoController.getALL);

// get one memos from a use logged in
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);

module.exports = router;
