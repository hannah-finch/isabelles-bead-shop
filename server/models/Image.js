const { Schema } = require("mongoose");

const imageSchema = new Schema(
  {
    Url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

module.exports = imageSchema;
