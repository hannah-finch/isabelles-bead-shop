const { Schema, model } = require("mongoose");
const reviewSchema = require("./reviews");
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["bracelet", "fidget", "earring", "keychain", "other"],
      default: "other",
    },
    quantity: {
      type: Number,
      required: true,
    },
    reviews: [reviewSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
