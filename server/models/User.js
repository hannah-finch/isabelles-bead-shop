//TODO Make THIS

// Basic model is schema will have:
// _id
// username (this is what we'll use to log in)
// email (for any varification)
// password
// clientName

const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Order = require("./Order");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    orders: [Order.schema],
    // clientName: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
