const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser } = require("../models/users");
const mongoose = require("mongoose");
const express = require("express");
const { sign } = require("jsonwebtoken");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  console.log("user", user);
  if (!user) return res.status(400).send("Invalid email or paasword");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or paasword");

  const token = user.generateAuthToken();

  //  const token = jwt.sign(
  //   { _id: user._id, name: user.name, email: user.email },
  //   process.env.jwtPrivateKey
  //   // config.get("jwtPrivateKey")
  // );

  return res.send(token);
});

router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already exists..");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  //_.pick(user, ["name", "email"]);

  //res.send(
  /*{
      name: user.name,
      email: user.email,
    }*/
  return res.status(200).send(_.pick(user, ["name", "email"]));
  //);
  //});
});
function generateAuthToken() {}
function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}
module.exports = router;
