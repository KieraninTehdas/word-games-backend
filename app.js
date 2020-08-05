require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const wordRouter = require("./routes/wordRoutes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.contentType("application/json");
  next();
});

mongoose.connect(`mongodb://${process.env.DB_HOST}/test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDb");
});

app.use("/words", wordRouter);

app.listen(process.env.APP_PORT, () =>
  console.log(`Express is listening at ${process.env.APP_PORT}`)
);
