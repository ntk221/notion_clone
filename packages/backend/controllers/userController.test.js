const userController = require("./userController");
const User = require("../models/User");

describe("userController", () => {
  describe("getUser", () => {
    it("should return an error response if user ID is invalid", async () => {
      const req = { userData: { userId: "invalid-id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      User.findById = jest.fn().mockReturnValue(undefined);

      await userController.getUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
    it("should return 200 status code and user data usually", async () => {
      const req = { userData: { userId: "valid-id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      User.findById = jest.fn().mockReturnValue({
        email: "hoge@mail.com",
        username: "hoge",
        _id: "valid-id",
      });

      await userController.getUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        email: "hoge@mail.com",
        username: "hoge",
        id: "valid-id",
      });
      expect(next).not.toHaveBeenCalled();
      expect(User.findById).toHaveBeenCalledWith("valid-id");
    });
    it("should call next with error if User.findById throws an error", async () => {
      const req = { userData: { userId: "valid-id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      User.findById = jest.fn().mockImplementation(() => {
        throw new Error("Error");
      });

      await userController.getUser(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error("Error"));
    });
  });
});
