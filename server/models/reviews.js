//TODO
const { Schema, model } = require("mongoose");
const { User } = require("./User");

/** Don't forget the cleanup to keep things tidy. Anything left in comments should be there because 
 * they provide documentation. If it's there because you wan't to save it for reference, create a branch,
 * but always strive to keep main clean and minimal
 */
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
