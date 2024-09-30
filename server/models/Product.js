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
    /**
     * Be careful using enums in areas where there is a higher degree of data
     * change. Making changes at the db in a real-world environment is usually boat
     * loads more problematic (beaurocratically, and physically). If you have to enforce
     * it with enum, do it at the api layer or have a meta-data table that holds the values
     * and use that for enforcement (through stored procedure or other db/orm rule)
     */
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
