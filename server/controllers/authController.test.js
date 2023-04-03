const authController = require("../controllers/authController");
require("dotenv").config();

describe("authController", () => {
  describe("signup", () => {
    it("should return 201 status code and token if signup succeeds", async () => {
      const req = {
        body: {
          email: "hoge@mail.com",
          password: "password",
          username: "hoge",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
      const mockUserModel = jest.fn().mockReturnValue({
        save: jest.fn(),
      });

      await authController.signup(req, res, next, mockUserModel);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ token: expect.any(String) });
      expect(next).not.toHaveBeenCalled();
    });
    it("should return 409 status code and error message if email already exists", async () => {
      const req = {
        body: {
          email: "hoge@email.com",
          password: "password",
          username: "hoge",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
      const err = {
        name: "MongoServerError",
        code: 11000,
        keyPattern: {
          email: true,
        },
      };
      const mockUserModel = jest.fn().mockReturnValue({
        save: jest.fn().mockImplementation(() => {
            throw err; 
            }),
        }),
      });

      await authController.signup(req, res, next, mockUserModel);

      expect(res.status).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ error: "Email already exists" });
      expect(next).not.toHaveBeenCalled();
    });
    it("should return 409 status code and error message if mongo server error occurs", async () => {
      const req = {
        body: {
          email: "hoge@email.com", 
            password: "password",
            username: "hoge",
        },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        const mockUserModel = jest.fn().mockReturnValue({
            save: jest.fn().mockImplementation(() => {
                throw new Error("Error");
            }
        )});

        await authController.signup(req, res, next, mockUserModel);

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ error: "Email already exists" });
        expect(next).not.toHaveBeenCalled();
    });
  });
});
