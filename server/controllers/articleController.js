const Article = require("../models/Article");

exports.getArticles = async (req, res) => {
    try {
        const { userId } = req.query;
        const articles = await Article.find({ author : userId});
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// idを含むリクエストから，記事の内容を取得して返す
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.postArticle = async (req, res) => {
    try {
        const { title, body, author } = req.body;
        const article = new Article({
            title,
            body,
            author,
        });
        await article.save();
        res.status(201).json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        await article.remove();
        res.status(200).json({ message: "Article deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
