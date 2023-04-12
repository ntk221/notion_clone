const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    body: { type: String, default: "ここに自由に記述してください"},
    title: { type: String, default: "無題"},
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
  });
  
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
