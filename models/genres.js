//const mongoose = require("mongoose");
const Joi = require("joi");
const mongoose = require("mongoose");
const genereSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});
const Genre = mongoose.model("Genre", genereSchema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(genre, schema);
}
exports.Genre = Genre;
exports.genereSchema = genereSchema;
exports.validateGenre = validateGenre;
