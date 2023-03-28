const articleSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    body: { type: String, required: true},
    title: { type: String, required: true},
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
  });
  
  const Article = mongoose.model("Article", articleSchema);

  module.exports = Article;