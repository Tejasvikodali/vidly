const moment = require("moment");
const request = require;
("supertest");
const { Rental } = require("../../models/rentals");
const { Movie } = require("../../models/movies");
const { User } = require("../../models/users");
const mongoose = require("mongoose");
const { expectCt } = require("helmet");
describe("/api/returns", () => {
  let server;
  let customerId;
  let movieId;
  let rental;
  let movie;
  let token;

  const exec = () => {
    return request(server)
      .post("api/returns")
      .set("x-auth-token", token)
      .send({ customerId, movieId });
  };
  beforeEach(async () => {
    server = require("../../app");
    customerId = mongoose.Types.ObjectId;
    movieId = mongoose.Types.ObjectId;
    token = new User().generateAuthToken;
    movie = new Movie({
      _id: movieId,
      title: "12345",
      dailyRentalRate: 2,
      genre: { name: "12345" },
      numberInStock: 10,
    });
    await movie.save();
    rental = new Rental({
      customer: {
        _id: mongoose.Types.ObjectId(),
        name: "12345",
        phone: "12345",
      },
      movie: {
        _id: movieId,
        title: "12345",
        dailyRentalRate: 2,
      },
    });

    await rental.save();
    // server.close();
  });
  afterEach(async () => {
    //await Genre.remove({});
    await server.close();
    await Rental.remove({});
    await Movie.remove({});
  });
  it("should return 401 if client is not logged in", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });
  it("should return 400 if customerId is not provided", async () => {
    customerId = "";
    //delete payload.custometrId;
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("should return 400 if movieId is not provided", async () => {
    movieId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("should return 404 if no rental found for the customer/movie", async () => {
    await Rental.remove({});
    const res = await exec();
    expect(res.status).toBe(404);
  });
  it("should return 400 if return is already processed", async () => {
    rental.dateReturned = new Date();
    await rental.save();
    const res = await exec();
    expect(res.status).toBe(404);
  });
  it("should return 200 if we have valid request", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
  it("should set the returnDate if input is valid", async () => {
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    const diff = new Date() - rentalInDb.dateReturned;
    //expect(rentalInDb.dateReturned).toBeDefined();
    expect(diff).toBeLessThan(10 * 1000);
  });
  it("should set the returnFee if input is valid", async () => {
    rental.dateOut = moment().add(-7, "days").toDate();
    await rental.save();
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBeDefined(14);
  });
  it("should increase the movie stock if input is valid", async () => {
    const res = await exec();
    const movieInDb = await Movie.findById(movieId);
    expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
  });
  it("should return the rental if input is valid", async () => {
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    expect(res.body).toHaveProperty("dateOut");
    expect(res.body).toHaveProperty("dateReturned");
    expect(res.body).toHaveProperty("rentalFee");
    expect(res.body).toHaveProperty("customer");
    expect(res.body).toHaveProperty("movie");

    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining([
        "dateOut",
        "dateReturned",
        "rentalFee",
        "customer",
        "movie",
      ])
    );
  });
});
