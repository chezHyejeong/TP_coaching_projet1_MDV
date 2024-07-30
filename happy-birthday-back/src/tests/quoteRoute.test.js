const request = require("supertest");
const express = require("express");
const quoteRoute = require("../api/routes/quoteRoute");

const app = express();
app.use("/api", quoteRoute);

describe("GET /api/randomquote", () => {
  it("should return a random quote", async () => {
    const response = await request(app).get("/api/randomquote");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("quote");
    expect(response.body).toHaveProperty("author");
  });
});
