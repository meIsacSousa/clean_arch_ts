import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/productRepository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration Test - Update product use case", () => {
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


    it("Should update a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const product = ProductFactory.create("Product", 100, "a");
        await productRepository.create(product as Product);

        const input = {
            id: product.id,
            name: "Nome Updated",
            price: 357,
        }

        const output = {
            id: input.id,
            name: input.name,
            price: input.price,
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

    it("Should throw an error when product not found", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const input = {
            id: "1",
            name: "Nome Updated",
            price: 357,
        }
        
        await expect(usecase.execute(input)).rejects.toThrowError("Product not found");
    });

});