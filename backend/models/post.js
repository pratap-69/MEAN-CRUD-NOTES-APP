const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
  // imagePath: { type: string, required: true }
});

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model("Product", productSchema);
module.exports = mongoose.model("Post", postSchema);

