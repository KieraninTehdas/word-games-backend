const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");
const wordRouter = require("./routes/wordRoutes");

const PORT = 8000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.contentType("application/json");
  next();
});

app.get("/cats", (req, res) => {
  console.log("Hit");
  db.findCat(req.query.name).then((result) => {
    res.status(200);
    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify(result));
  });
});

app.post("/cats", (req, res) => {
  if (req.body.name == null) {
    res.status(400);
    res.end();
    return;
  }

  db.saveCat(req.body.name);

  res.status(200);
  res.end();
});

app.use("/words", wordRouter);

app.listen(PORT, () => console.log(`Express is listening at ${PORT}`));
