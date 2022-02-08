const express = require("express");
const app = express();

app.post("/users", (req, res) => {
  res.send("hello world");
});

module.exports = app;
