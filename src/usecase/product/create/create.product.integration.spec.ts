import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/productRepository";
import CreateProductUseCase from "./create.product.usecase";

describe("Integration Test - Create Product", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product",
            price: 100
        }

        const output = {
            id: expect.any(String),
            name: input.name,
            price: input.price
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

    it("Should throw an error when name is missing", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const input = {
            name: "",
            price: 100
        }

        await expect(() => usecase.execute(input)).rejects.toThrowError("Name is required");
    });
});