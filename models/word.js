const mongoose = require("mongoose");
const ISO6391 = require("iso-639-1");

const WordSchema = mongoose.Schema({
  word: { type: String, required: true },
  language: { type: String, required: true },
  key: { type: String, required: true },
  theme: { type: String, required: false },
});

module.exports = mongoose.model("Word", WordSchema);
