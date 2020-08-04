const Word = require("../models/word");
const { v4: uuidv4 } = require("uuid");

exports.createWords = async function (request, response) {
  key = uuidv4();

  // Validation: ensure two different languages!
  // Validation: length should be <= 2

  const words = request.body.words.map((word) => {
    const wordToSave = { word: word.word, language: word.language, key: key };

    if (request.body.theme !== null) {
      wordToSave.theme = request.body.theme;
    }

    return wordToSave;
  });

  const savedWords = await Word.insertMany(words);

  response.json(savedWords);
};

exports.getWords = async function (request, response) {
  const SUPPORTED_QUERY_PARAMS = Object.freeze(["theme", "key"]);

  const validQueryParams = Object.keys(request.query).filter((objectKey) =>
    SUPPORTED_QUERY_PARAMS.includes(objectKey)
  );

  if (
    Object.keys(request.query).length === 0 ||
    validQueryParams.length === 0
  ) {
    return getAllWords(response);
  }

  // TODO: Regex to make sure key is valid?

  const dbQueryParams = validQueryParams.reduce((acc, curr) => {
    return { ...acc, [curr]: request.query[curr] };
  }, {});

  const words = await Word.find(dbQueryParams);

  response.json(words);
};

async function getAllWords(response) {
  const allWords = await Word.find({});

  response.json(allWords);
}

exports.getWordById = async function (request, response) {
  const word = await Word.findById(request.params.wordId);

  response.json(word);
};

exports.deleteWordPairsByKey = function (request, response) {
  Word.deleteMany({ key: { $in: request.body.keys } })
    .then(() => {
      response.status(204);
      response.end();
    })
    .catch((err) => response.status(422).json({ error: err }));
};
