const request = require("supertest");
const app = require("./server");

describe("GET /user", () => {
  let token;

  beforeAll(async () => {
    // テスト用のユーザーを作成してトークンを取得する
    const user = {
      email: "test@example.com",
      password: "password123",
      username: "testuser"
    };
    const response = await request(app).post("/signup").send(user);
    token = response.body.token;
  });

  test("should return user information with valid token", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe("test@example.com");
    expect(response.body.username).toBe("testuser");
  });

  test("should return 401 error with invalid token", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", "Bearer invalidtoken");

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Authentication failed");
  });

  test("should return 404 error with non-existent user ID", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`)
      .query({ userId: "nonexistentuserid" });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("User not found");
  });
});
