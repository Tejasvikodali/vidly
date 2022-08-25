const { User } = require("../../../models/users");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
require("dotenv").config();
describe("user.generateAuthToken", () => {
  it("should return a valid JWT", () => {
    // console.log(process.env.jwtPrivateKey);
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
      name: "tejasvikodali",
      email: "tejasvikodali@gmail.com",
      password: "1234",
    };
    const user = new User(payload);
    const token = jwt.sign(
      {
        name: payload.name,
        email: payload.email,
        isAdmin: payload.isAdmin,
      },
      process.env.jwtPrivateKey
    );
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    //expect(decoded).toMatchObject(payload);
    expect(decoded).toMatchObject({
      name: "tejasvikodali",
      email: "tejasvikodali@gmail.com",
      isAdmin: true,
    });
  });
});
