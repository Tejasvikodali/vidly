const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser } = require("../models/users");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.mail });
  if (user) return res.status(400).send("user already registered");

  user = new User(
    /*{
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });*/ _.pick(req.body, ["name", "email", "password"])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  /*const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.jwtPrivateKey,*/

  //_.pick(user, ["name", "email"]);
  const token = user.generateAuthToken();

  res
    .header("x-auth.token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
