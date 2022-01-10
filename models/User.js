const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  // picture: { type: String },
  // image: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("User", User);
