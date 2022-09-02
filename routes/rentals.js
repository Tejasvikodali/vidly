const { Rental, validate } = require("../models/rentals");
const { Movie } = require("../models/movies");
const { Customer } = require("../models/customer");
const Fawn = require("fawn");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const config = require("config");
const db = config.get("db");

// Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  console.log("post route hitted..!");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  /*if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
    return res.status(400).send("Invalid customer");*/

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  await rental.save();
  console.log("rental created..");
  movie.numberInStock--;
  movie.save();
  return res.status(200).send("rental created..!");
  // try {
  //   const rentals_data = await Rental.
  //   new Fawn.Task()
  //     .save("rentals", rental)
  //     .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })

  //     //.remove();
  //     .run();

  //   res.send(rental);
  // } catch (ex) {
  //   console.log(ex);
  //   res.status(500).send("Something Failed...");
  // }
});
router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});
// router.post("/getrentaldetails", async (req, res) => {
//   if (!req.body.title) return res.status(400).send("title is required");
//   const rental = await Movie.find({ title: req.body.title });

//   if (!rental) return res.status(404).send("No data found.");

//   return res.status(200).send(rental);
// });

// router.post("/getrentaldetails", async (req, res) => {
//   if (!req.body.title) return res.status(400).send("title is required");
//   var rental = await Movie.find({ title: req.body.title });
//   //db.articles.aggregate([{ $match: { title: "req.body.title" } }]);
//   // db.inventory.updateMany(
//   //   { title: { $in: ["", "school"] } }
//   const Rental = mongoose.model("Rental", rentalSchema);

//   async function getRental() {
//     return await Rental.find({ title: "movie.title" });
//   }

//   async function run() {
//     const rental = await getRental();
//     console.log(rental);
//   }

//   run();

//   // );
//   if (rental.length === 0) {
//     return res.status(404).send("No data found.");
//   }

//   return res.status(200).send(rental);
// });

router.post("/getrentaldetails", async (req, res) => {
  if (!req.body.title) return res.status(400).send("title is required");
  //var rental = await Movie.find({ title: req.body.title });
  await movie.find({
    $or: [
      { title: /^req.body.title/ },
      {
        title: /req.body.title$/i,
      },
      {
        title: /.*.req.body.title.*/i,
      },
    ],
  });

  if (rental.length === 0) {
    return res.status(404).send("No data found.");
  }

  return res.status(200).send(rental);
});

module.exports = router;

//Evil Dead
