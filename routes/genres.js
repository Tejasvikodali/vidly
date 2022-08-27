//const mongoose = require("mongoose");
const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Genre, validateGenre } = require("../models/genres");
//const asyncMiddleware = require("../middleware/async");
//router.get("/another", (req, res, next) => {});
module.exports = function (app) {
  app.get("/", (req, res) => {
    res.send("Hello Codegene Software");

    res.end();
  });
};

router.get("/", async (req, res, next) => {
  // throw new Error("Could not get the genres.");
  // console.log("hitted......");
  const genres = await Genre.find().sort("name");
  return res.send(genres);
});

router.post("/", auth, async (req, res) => {
  console.log("post route in genres");
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  console.log("genre", genre);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", validateObjectId, async (req, res) => {
  //if (!mongoose.Types.ObjectId.isValid(req.params.id));
  //return res.status(404).send("Invalid ID.");
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

module.exports = router;
