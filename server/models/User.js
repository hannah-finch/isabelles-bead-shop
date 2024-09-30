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

/**
 * The thing about ORM is it does a bunch of stuff for you. Sometimes is does stuff without
 * you wanting it. Ids is one thing. While it's not a big deal, I try to specify the id and prefer
 * GUID over sequential because of the global uniqueness of the value and is url safe without giving
 * insight into your system (i.e. a hacker would not gain knowledge of your system by looking at a 
 * GUID but would by looking at a sequential id). The cost of GUID is negligable in terms of db storage
 * so not a lot of downsides to using it (unless you are creating ids manually for seeding data). 
 */
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
    role: {
      type: String,
      required: true,
      default: "client",
      enum: ["admin", "client"],
    },
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
