const articleController = require("./articleController");
jest.mock("../models/Article");
const Article = require("../models/Article");

describe("articleController", () => {
  describe("getArticles", () => {
    it("should return all articles for the given user", async () => {
      // arrange
      const userId = "test-user-id";
      const articles = [
        {
          title: "test-article-1",
          body: "test-article-1-body",
          author: userId,
        },
        {
          title: "test-article-2",
          body: "test-article-2-body",
          author: userId,
        },
      ];
      
      Article.find = jest.fn().mockResolvedValueOnce(articles);

      const req = {
        query: { userId }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      // act
      await articleController.getArticles(
        { query: { userId } },
        res
      );

      // assert
      expect(Article.find).toHaveBeenCalledWith({ author: userId });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(articles);
    });
  });

  // post については postman で確認する

  
  describe("getArticleById", () => {
    it("should return the article with the given id", async () => {
      // arrange
      const articleId = "test-article-id";
      const article = {
        title: "test-article-1",
        body: "test-article-1-body",
        author: "test-user-id",
      };

      Article.findById = jest.fn().mockResolvedValueOnce(article);

      const req = {
        params: { id: articleId }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // act

      await articleController.getArticleById(req, res);

      // assert

      expect(Article.findById).toHaveBeenCalledWith(articleId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(article);
    });
  });
});
