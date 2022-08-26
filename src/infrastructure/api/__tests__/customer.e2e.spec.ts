import { app, sequelize } from "../express";
import request from "supertest";

describe("Test E2E - Customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("Should create a customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "John Doe",
                address: {
                    street: "Rua dois",
                    number: 123,
                    city: "São Paulo",
                    zip: "01234-567",
                }
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name", "John Doe");
        expect(response.body).toHaveProperty("address");
        expect(response.body.address).toHaveProperty("street", "Rua dois");
        expect(response.body.address).toHaveProperty("number", 123);
        expect(response.body.address).toHaveProperty("city", "São Paulo");
        expect(response.body.address).toHaveProperty("zip", "01234-567");
    });

    it("Should not create a costumer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "John Doe"
            });

        expect(response.status).toBe(500);
    });

    it("Should return a list of customers", async () => {
        await request(app)
            .post("/customers")
            .send({
                name: "John One",
                address: {
                    street: "Rua Um",
                    number: 1,
                    city: "São Paulo",
                    zip: "01234-567",
                }
            });

        await request(app)
            .post("/customers")
            .send({
                name: "John Two",
                address: {
                    street: "Rua dois",
                    number: 2,
                    city: "São Paulo",
                    zip: "01234-567",
                }
            });

        const response = await request(app)
            .get("/customers");

        expect(response.status).toBe(200);
        expect(response.body.customers).toHaveLength(2);

        expect(response.body.customers[0]).toHaveProperty("id");
        expect(response.body.customers[0]).toHaveProperty("name", "John One");
        expect(response.body.customers[0]).toHaveProperty("address");
        expect(response.body.customers[0].address).toHaveProperty("street", "Rua Um");
        expect(response.body.customers[0].address).toHaveProperty("number", 1);
        expect(response.body.customers[0].address).toHaveProperty("city", "São Paulo");
        expect(response.body.customers[0].address).toHaveProperty("zip", "01234-567");

        expect(response.body.customers[1]).toHaveProperty("id");
        expect(response.body.customers[1]).toHaveProperty("name", "John Two");
        expect(response.body.customers[1]).toHaveProperty("address");
        expect(response.body.customers[1].address).toHaveProperty("street", "Rua dois");
        expect(response.body.customers[1].address).toHaveProperty("number", 2);
        expect(response.body.customers[1].address).toHaveProperty("city", "São Paulo");
        expect(response.body.customers[1].address).toHaveProperty("zip", "01234-567");


        const listResponseXML = await request(app)
            .get("/customers").set("accept", "application/xml").send();

        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        expect(listResponseXML.text).toContain("<customers>");
        expect(listResponseXML.text).toContain("<customer>");
        expect(listResponseXML.text).toContain("<id>");
        expect(listResponseXML.text).toContain("<name>John One</name>");
        expect(listResponseXML.text).toContain("<address>");
        expect(listResponseXML.text).toContain("<street>Rua Um</street>");
        expect(listResponseXML.text).toContain("<number>1</number>");
        expect(listResponseXML.text).toContain("<city>São Paulo</city>");
        expect(listResponseXML.text).toContain("<zip>01234-567</zip>");
        expect(listResponseXML.text).toContain("</address>");
        expect(listResponseXML.text).toContain("</customer>");
        expect(listResponseXML.text).toContain("<customer>");
        expect(listResponseXML.text).toContain("<id>");
        expect(listResponseXML.text).toContain("<name>John Two</name>");
        expect(listResponseXML.text).toContain("<address>");
        expect(listResponseXML.text).toContain("<street>Rua dois</street>");
        expect(listResponseXML.text).toContain("<number>2</number>");
        expect(listResponseXML.text).toContain("<city>São Paulo</city>");
        expect(listResponseXML.text).toContain("<zip>01234-567</zip>");
        expect(listResponseXML.text).toContain("</address>");
        expect(listResponseXML.text).toContain("</customer>");
        expect(listResponseXML.text).toContain("</customers>");
    });
});