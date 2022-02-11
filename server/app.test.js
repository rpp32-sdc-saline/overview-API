const request = require("supertest");
const makeApp = require("./app");
const { pool } = require("./db");
const testResults = require("./test.json");

const getProducts = jest.fn();
const getProduct = jest.fn();
const getStyle = jest.fn();

const mockApp = makeApp({
  getProducts,
  getProduct,
  getStyle,
});

const app = makeApp(pool);

beforeEach(() => {
  getProducts.mockReset();
});

describe("Database methods", () => {
  describe("GET /products", () => {
    describe("request containing no parameters", () => {
      test("No parameters should call getProducts with default values of page = 1 and count = 5", async () => {
        const response = await request(mockApp).get("/products");
        expect(getProducts.mock.calls.length).toBe(1);
        expect(getProducts.mock.calls[0][0]).toBe(1);
        expect(getProducts.mock.calls[0][1]).toBe(5);
      });
    });

    describe("request containing parameters", () => {
      test("count parameter of 7 and page parameter of 7 should call getProducts with corresponding page and count arguments", async () => {
        const response = await request(mockApp)
          .get("/products")
          .query({ page: 7, count: 7 });
        expect(getProducts.mock.calls.length).toBe(1);
        expect(getProducts.mock.calls[0][0]).toBe("7");
        expect(getProducts.mock.calls[0][1]).toBe("7");
      });
    });
  });

  describe("GET /products/:id", () => {
    describe("request containing product id", () => {
      test("should call getProduct with passed in argument of id", async () => {
        const response = await request(mockApp).get("/products/15000");
        expect(getProduct.mock.calls.length).toBe(1);
        expect(getProduct.mock.calls[0][0]).toBe("15000");
      });
    });
  });

  describe("GET /products/:id/styles", () => {
    describe("request containing product id", () => {
      test("should call getStyle with passed in argument of id", async () => {
        const response = await request(mockApp).get("/products/15000/styles");
        expect(getStyle.mock.calls.length).toBe(1);
        expect(getProduct.mock.calls[0][0]).toBe("15000");
      });
    });
  });
});

describe("Checking database results", () => {
  describe("GET /products", () => {
    test("Should return the correct result with default parameters", async () => {
      const response = await request(app).get("/products");
      expect(response.text).toBe(JSON.stringify(testResults.products_default));
    });
    test("Should return the correct result with count parameter of 7 and page parameter of 7", async () => {
      const response = await request(app)
        .get("/products")
        .query({ page: 7, count: 7 });

      expect(response.text).toBe(JSON.stringify(testResults.products_params));
    });
  });

  describe("GET /products/:id", () => {
    test("Should return the correct result for data id = 1", async () => {
      const response = await request(app).get("/products/1");
      expect(response.text).toBe(JSON.stringify(testResults.product_1));
    });
    test("Should return status code of for bad id query", async () => {
      const response = await request(app)
        .get("/products/hello")
        .query({ page: 7, count: 7 });

      expect(response.text).toBe(
        'invalid input syntax for type integer: "hello"'
      );
      expect(response.statusCode).toBe(400);
    });
  });

  describe("GET /products/:id/styles", () => {
    test("Should return the correct result for data id = 1", async () => {
      const response = await request(app).get("/products/1/styles");
      expect(response.text).toBe(JSON.stringify(testResults.styles_1));
    });
    test("Should return status code of for bad id query", async () => {
      const response = await request(app)
        .get("/products/hello/styles")
        .query({ page: 7, count: 7 });

      expect(response.text).toBe(
        'invalid input syntax for type integer: "hello"'
      );
      expect(response.statusCode).toBe(400);
    });
  });
});
