const Word = require("../models/word");
const { v4: uuidv4 } = require("uuid");

exports.createWord = function (request, response) {
  let key = request.body.key;

  if (key == null) {
    key = uuidv4();
  }

  const newWord = new Word({
    word: request.body.word,
    language: request.body.language,
    key: key,
  });

  newWord.save((error, savedWord) => {
    if (error) {
      return console.error(error);
    }

    console.log(savedWord);
  });

  response.status(200);
  response.setHeader("Content-Type", "application/json");
  response.end();
};
