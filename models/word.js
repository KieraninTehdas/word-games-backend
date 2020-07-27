const mongoose = require("mongoose");
const ISO6391 = require("iso-639-1");

const Schema = mongoose.Schema;

const WordSchema = new Schema({
  word: { type: String, required: true },
  language: { type: String, required: true },
  key: { type: String, required: true },
});

module.exports = mongoose.model("Word", WordSchema);
