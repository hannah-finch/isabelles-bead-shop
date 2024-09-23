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
      enum: ["bracelet", "fidget", "earring", "keychain", "necklace", "trinket", "other"],
      default: "other",
    },
    stock: {
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
productSchema.virtual("imageURL").get(function () {
  return `https://res.cloudinary.com/dflvzyvkr/image/upload/v1726964474/${this.image}.jpg`;
});

const Product = model("Product", productSchema);

module.exports = Product;
