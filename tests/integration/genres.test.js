const request = require("supertest");
const { Genre } = require("../../models/genres");
const { User } = require("../../models/users");
const mongoose = require("mongoose");
let server;
describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../../../app");
    // server.close();
  });
  afterEach(async () => {
    await server.close();
    await Genre.remove({});
  });
  describe("GET /", () => {
    it("should return all genres", async () => {
      var d = await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);
      console.log("ddddddd", d);
      const res = await request(server).get("/api/genres");

      expect(res.status).toBe(200);
      //expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre.id);
      expect(res.status).toBe(200);
      //expect(res.body).toMatchObject(genre);
      expect(res.body).toHaveProperty("name", genre.name);
    });
    it("should return 404 if invalid id is passed", async () => {
      // const genre = new Genre({ name: "genre1" });
      // await genre.save();

      const res = await request(server).get("/api/genres/1" + 123);
      expect(res.status).toBe(404);
      //expect(res.body).toMatchObject(genre);
      //expect(res.body).toHaveProperty("name", genre.name);
    });
  });
  it("should return 404 if the no genre with the given id exits", async () => {
    // const genre = new Genre({ name: "genre1" });
    // await genre.save();
    const id = mongoose.Types.ObjectId();
    const res = await request(server).get("/api/genres/" + id);
    expect(res.status).toBe(404);
    //expect(res.body).toMatchObject(genre);
    //expect(res.body).toHaveProperty("name", genre.name);
  });
});
describe("POST /", () => {
  let token;
  let name;
  const exec = async () => {
    return await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name });
  };
  beforeEach(() => {
    token = new User().generateAuthToken();
    name = "genre1";
  });

  it("should return 401 if client is not logged in", async () => {
    token = "";

    const res = await exec();
    expect(res.status).toBe(401);
  });
  it("should return 400 if genre is less than 5 characters", async () => {
    name = "1234";
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("should return 400 if genre is more than 50 characters", async () => {
    name = new Array(52).join("a");
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("should return 200 if it is valid", async () => {
    const token = new User().generateAuthToken();
    //const name = new Array(52).join('a')
    const res = await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genre1" });
    const genre = await Genre.find({ name: "genre1" });
    expect(genre).not.toBeNull();
  });
  it("should save the genre if it is valid", async () => {
    await exec();
    //const name = new Array(52).join('a')
    //TODO
    const genre = await Genre.find({ name: "genre1" });
    expect(genre).not.toBeNull();
  });
  it("should return the genre if it is valid", async () => {
    const res = await exec();
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name", "genre1");
  });
});
