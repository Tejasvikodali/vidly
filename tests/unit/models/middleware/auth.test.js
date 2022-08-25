// const { User } = require("../../../../models/users");
// const auth = require("../../../../middleware/auth");
// const mongoose = require("mongoose");
// const { Jest } = require("jest");
// // const Jest = require("jest");
// describe("auth middleware", () => {
//   it("should populate req.user with payload of a valid JWT", () => {
//     const user = {
//       // _id: mongoose.Types.ObjectId().toHexString,
//       name: "tejasvi",
//       email: "tejasvikodali@gmail.com",
//       isAdmin: true,
//     };
//     const token = new User(user).generateAuthToken();
//     const req = {
//       header: Jest.fn().mockReturnValue(token),
//     };
//     const res = {};

//     const next = jest.fn;

//     auth(req, res, next);
//     expect(req.user).toMatchObject(user);
//   });
// });

// // const {User} = require('../../models/user');
// // const { Genre } = require("../../../../models/genres");
// // const request = require('supertest');

// // describe("auth middleware", () => {
// //   beforeEach(() => {
// //     server = require("../../../../app");
// //   });
// //   afterEach(async () => {
// //     await Genre.remove({});
// //     server.close();
// //   });

// //   let token;

// //   const exec = () => {
// //     return request(server)
// //       .post("/api/genres")
// //       .set("x-auth-token", token)
// //       .send({ name: "genre1" });
// //   };

// //   beforeEach(() => {
// //     token = new User().generateAuthToken();
// //   });

// //   it("should return 401 if no token is provided", async () => {
// //     token = "";

// //     const res = await exec();

// //     expect(res.status).toBe(401);
// //   });

// //   it("should return 400 if token is invalid", async () => {
// //     token = "a";

// //     const res = await exec();

// //     expect(res.status).toBe(400);
// //   });

// //   it("should return 200 if token is valid", async () => {
// //     const res = await exec();

// //     expect(res.status).toBe(200);
// //   });
// // });
