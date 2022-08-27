/*const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/logger");
const express = require("express");
const res = require("express/lib/response");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://vidlyuser:vidlypass@cluster0.7ofhy.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get("env")}`);

//app.set("view engine", "pug");
//app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/", home);
app.use("/api/courses", courses);

console.log("Application name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") == "development") {
  app.use(morgan("tiny"));
  /*startupDebugger*/ //debug("Morgan enabled...");
//}

/*dbDebugger("Connected to the database...");
app.use(morgan("tiny"));
app.use(logger);

app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.render("index", { title: "My Express app", message: "Hello" });
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The course with given id was not found");

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given id was not found");
  res.send(course);
});*/

/*app.use(logger);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));*/
//require("express-async-errors");
const winston = require("winston");
// require("winston-mongodb");
//var Promise = require("promise");
//const config = require("config");
//const error = require("./middleware/error");
//require("express-async-errors");
// const Joi = require("joi");
// Joi.objectid = require("joi-objectId")(Joi);
// const db = require("./startups/db");
// const routes = require("./startups/routes");
//const mongoose = require("mongoose");

//const genres = require("./routes/genres");
//const customers = require("./routes/customers");
//const movies = require("./routes/movies");
//const rentals = require("./routes/rentals");
require("dotenv").config();

// const express = require("express");
// const app = express();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Codegene Software");

  res.end();
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

// app.get("/messages", (req, res) => {
//   res.send("Hello Codegene!");
// });
//const users = require("./routes/users");
//const auth = require("./routes/auth");
require("./startups/db")();

require("./startups/routes")(app);

require("./startups/logging");

require("./startups/config")();

require("./startups/validations")();
require("./startups/prod")(app);

//process.on("uncaughtException", (ex) => {
// console.log(h);
//console.log("WE GOT AN UNCAUGHT EXCEPTION");
//winston.error(ex.message, ex);
//process.exit(1);
//});
// console.log("11111");
// winston.exceptions.handle(
//   new winston.transports.File({ filename: "uncaughtExceptions.log" })
// );

// process.on("uncaughtRejection", (ex) => {
//   throw ex;
// console.log(h);
//console.log("WE GOT AN UNCAUGHT REJECTION");
//winston.error(ex.message, ex);
//process.exit(1);
//});

// winston.add(new winston.transports.File({ filename: "logfile.log " }));
// winston.add(
//   new winston.transports.MongoDB({
//     db: "mongodb+srv://vidlyuser:vidlypass@cluster0.7ofhy.mongodb.net/?retryWrites=true&w=majority",
//     level: "info",
//   })
// );
// const p = Promise.reject(new Error("Something failed misereble."));

// p.then(() => console.log("Done"));

// if (!process.env.jwtPrivateKey) {
//   console.error("FATAL ERROR: jwtPrivatekey is not defined.");
//   process.exit(1);
// }
// const connectionstring =
//   "mongodb+srv://vidlyuser:vidlypass@cluster0.7ofhy.mongodb.net/?retryWrites=true&w=majority";
// mongoose
//   .connect(connectionstring, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Could not connect to MongoDB"));

//app.use(express.json());
//app.use("/api/generes", genres);
//app.use("/api/customers", customers);
//app.use("/api/movies", movies);
//app.use("/api/rentals", rentals);
//app.use("/api/users", users);
//app.use("/api/auth", auth);
//app.use(error);
// console.log(process.env.jwtPrivateKey);

// const port = process.env.PORT || 8080;
// const server = app.listen(port, () =>
//   winston.info(`Listening on port ${port}...`)
// );
// app.get("/messages", (req, res) => {
//   res.send("Hello Codegene!");
// });

module.exports = server;
