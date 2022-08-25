const Joi = require("joi");

const validate = require("../middleware/validate");
const { Rental } = require("../models/rentals");
const { Movie } = require("../models/movies");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if (!rental) return res.status(404).send("Rental not found");
  if (rental.dateReturned)
    return res.status(400).send("Return already processed.");
  rental.return();
  await rental.save();
  await Movie.update(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 },
    }
  );

  return res.send(rental);
  //res.status(401).send("unauthorized");
});
function validateReturn(req) {
  const schema = {
    customerId: Joi.ObjectId().required(),
    movieId: Joi.ObjectId().required(),
  };

  return Joi.validate(genre, schema);
}
module.exports = router;
