const request = require("supertest");
const app = require("./app");

describe("GET /products", () => {
  describe("given a username and password", () => {
    test("No parameter passed in should return 5 json objects starting from page 1", async () => {
      const response = await request(app).get("/products");
      expect(response).toBe();
    });
  });

  // describe("Count parameter of 7 returns 7 json objects in response", () => {
  //   test("No parameter passed in should return 5 json objects starting from page 1", async () => {
  //     const response = await request(app).post("/products").send({
  //       username: "username",
  //       password: "password",
  //     });
  //     expect(response.statusCode).toBe(200);
  //   });
  // });
  describe("Page parameter of 2 with count 7 returns 7 json objects in response starting from id of 14", () => {});
});
