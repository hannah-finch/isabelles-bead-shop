const { Schema, model } = require("mongoose");

// TODO: rewrite this and typeDef to be nested
const infoSchema = new Schema({
  id: {
    type: Number,
    default: 0
  },
  announcement: {
    type: String,
  },
  about1Title: {
    type: String,
  },
  about1Text: {
    type: String,
  },
  about2Title: {
    type: String,
  },
  about2Text: {
    type: String,
  },
});

const Info = model("Info", infoSchema);

module.exports = Info;
