const express = require("express");
const router = express.Router();

const wordController = require("../controllers/wordController");
router.post("/", wordController.createWords);
router.get("/", wordController.getWords);
router.get("/:wordId", wordController.getWordById);
router.put("/delete", wordController.deleteWordPairsByKey);

module.exports = router;
