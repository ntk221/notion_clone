const Article = require("../models/Article");

exports.getArticles = async (req, res) => {
    try {
        const { userId } = req.query;
        console.log(userId);
        const articles = await Article.find({ author : userId});
        console.log(articles);
        res.status(200).json(articles);
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