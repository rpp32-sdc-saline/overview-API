const request = require("supertest");
const makeApp = require("./app");

const getProducts = jest.fn();
const getProduct = jest.fn();
const getStyle = jest.fn();

const app = makeApp({
  getProducts,
  getProduct,
  getStyle,
});

beforeEach(() => {
  getProducts.mockReset();
});

describe("GET /products", () => {
  describe("request containing no parameters", () => {
    test("No parameters should call getProducts with default values of page = 1 and count = 5", async () => {
      const response = await request(app).get("/products");
      expect(getProducts.mock.calls.length).toBe(1);
      expect(getProducts.mock.calls[0][0]).toBe(1);
      expect(getProducts.mock.calls[0][1]).toBe(5);
    });
  });

  describe("request containing parameters", () => {
    test("count parameter of 7 and page parameter of 7 should call getProducts with corresponding page and count arguments", async () => {
      const response = await request(app)
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
      const response = await request(app).get("/products/15000");
      expect(getProduct.mock.calls.length).toBe(1);
      expect(getProduct.mock.calls[0][0]).toBe("15000");
    });
  });
});

describe("GET /products/:id/styles", () => {
  describe("request containing product id", () => {
    test("should call getStyle with passed in argument of id", async () => {
      const response = await request(app).get("/products/15000/styles");
      expect(getStyle.mock.calls.length).toBe(1);
      expect(getProduct.mock.calls[0][0]).toBe("15000");
    });
  });
});
