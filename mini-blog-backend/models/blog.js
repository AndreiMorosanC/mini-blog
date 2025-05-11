const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  img: { type: String },
  userId: { type: String, required: true },
  userEmail: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
