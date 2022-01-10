const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bookmark = new Schema({

  caption: { type: String, required: true },
  username: { type: String, required: true },
  timestamp: { type: String, required: false },
  comment: { type: Array }

});

module.exports = mongoose.model("Bookmark", Bookmark);
