const { Schema, model } = require("mongoose");
const imageSchema = require("./Image");
const reviewSchema = require("./reviews")
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
      type: imageSchema,
      default: {
        Url: "images/tempPictures/defaultProductImage.jpg",
        name: "defaultProductImage",
        description: "This is a default product image.",
      },
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    reviews: {
      type: reviewSchema,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
