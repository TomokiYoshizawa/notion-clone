const router = require("express").Router();
const memoController = require("../src/controllers/memoController");
const tokenHandler = require("../src/handlers/tokenHandler");

router.post("/", tokenHandler.verifyToken, memoController.create);

module.exports = router;
