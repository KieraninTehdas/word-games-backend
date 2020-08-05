const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const wordRouter = require("./routes/wordRoutes");

// TODO: Use .env for config

const PORT = 8000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.contentType("application/json");
  next();
});

mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("We're connected!");
});

app.use("/words", wordRouter);

app.listen(PORT, () => console.log(`Express is listening at ${PORT}`));
