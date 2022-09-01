const express = require("express");
const router = express.Router();
//const app = express();

router.post("/test", async (req, res) => {
  var data = req.body.name;
  console.log(req.body);
  return res.send(data);
});

// router.post("/movieId", async (req, res) => {
//   console.log(" hitted..!");
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const movie = await Movie.findById(req.body.movieId);
//   if (!movie) return res.status(400).send("Invalid movie.");

//   if (movie.numberInStock === 0)
//     return res.status(400).send("Movie not in stock.");
// });
// router.get("/movieid", async (req, res) => {
//   const movie = await Movie.findById(req.params.id);

//   if (!movie)
//     return res.status(404).send("The movie with the given ID was not found.");

//   return res.send(movie);
// });

module.exports = router;
