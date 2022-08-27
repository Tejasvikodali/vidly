const express = require("express");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
require("../routes/returns");
const error = require("../middleware/error");

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.send("Hello Codegene Software");

    res.end();
  });

  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/rentals", rentals);
  app.use(error);

  const PORT = process.env.PORT || 5000;

  const server = app.listen(
    PORT,
    console.log(`Server started on port ${PORT}`)
  );

  module.exports = server;
};
