//TODO
const { Schema, model } = require("mongoose");
const { User } = require("./User");

const reviewSchema = new Schema({
  //   reviewID: {
  //     type: String,
  //     required: true,
  //     unique: true,
  //   },
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxLength: 300,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

module.exports = reviewSchema;
