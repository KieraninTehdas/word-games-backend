const { request } = require("express");

const express = require("express");
const router = express.Router();
const wordController = require("../controllers/wordController");
const { response } = require("express");

router.post("/words", wordController.createWord(request, response));

module.exports = router;
