//TODO
const { Schema, model } = require("mongoose");
const { User } = require("./User");

const reviewSchema = new Schema(
    {
        reviewID: {
            type: String,
            required: true,
            unique: true,
        },
        username: User._id,
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
        }
    }
)

const Review = model("Review", reviewSchema)

module.exports = Review;