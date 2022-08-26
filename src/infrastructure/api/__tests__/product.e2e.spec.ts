import { app, sequelize } from "../express"
import request from "supertest";

describe("Test E2E - Product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("Should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product",
                price: 100.00,
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name", "Product");
        expect(response.body).toHaveProperty("price", 100.00);
    });

    it("Should not create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product",
            });

        expect(response.status).toBe(500);
    });

    it("Should return a list of products", async () => {
        await request(app)
            .post("/products")
            .send({
                name: "Product One",
                price: 100.00,
            });

        await request(app)
            .post("/products")
            .send({
                name: "Product Two",
                price: 200.00,
            });

        const response = await request(app)
            .get("/products");

        expect(response.status).toBe(200);
        expect(response.body.products).toHaveLength(2);
        expect(response.body.products[0]).toHaveProperty("id");
        expect(response.body.products[0]).toHaveProperty("name", "Product One");
        expect(response.body.products[0]).toHaveProperty("price", 100.00);
        expect(response.body.products[1]).toHaveProperty("id");
        expect(response.body.products[1]).toHaveProperty("name", "Product Two");
        expect(response.body.products[1]).toHaveProperty("price", 200.00);
    });
});