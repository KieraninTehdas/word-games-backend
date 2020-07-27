const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("We're connected!");
});

const kittySchema = new mongoose.Schema({ name: String });

kittySchema.methods.speak = function () {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

const Kitten = mongoose.model("Kitten", kittySchema);

function saveCat(name) {
  const newKitten = new Kitten({ name });

  newKitten.save((err, kitten) => {
    if (err) {
      return console.error("Failed to save due to error", err);
    }

    console.log("Saved!");

    kitten.speak();
  });
}

function findCat(name) {
  return Kitten.find({ name }).exec();
}

exports.saveCat = saveCat;
exports.findCat = findCat;
