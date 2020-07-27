const express = require("express");

const PORT = 8000;

const app = express();

app.get("/", (req, res) => res.send("Hello Worlds"));

app.listen(PORT, () => console.log(`Express is listening at ${PORT}`));
