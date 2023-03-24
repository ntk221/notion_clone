const request = require("supertest"); // サーバーの起動用
const app = require("./server");
const { MongoMemoryServer }= require("mongodb-memory-server");
const mongoose = require("mongoose");

jest.setTimeout(100000);

let mockDb;

beforeAll(async () => {
    if (mongoose.connection.readyState !== 0)
      await mongoose.disconnect();
    mockDb = await MongoMemoryServer.create();
    const uri =  mockDb.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

afterAll(async () => {
  await mongoose.disconnect();
  await mockDb.stop();
  await app.close();
});

describe("POST /signup", () => {
    test("登録が成功したらJWTトークンを返す", async () => {
        const response = await request(app)
            .post("/signup")
            .send({ email: "test@example.com", password: "password" });

        expect(response.statusCode).toBe(201);
        expect(response.body.token).toBeDefined();
    });
});
