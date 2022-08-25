import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/productRepository";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test - list product use case", () => {
    let sequelize: Sequelize;
    
    beforeEach( async () => {
        sequelize = new Sequelize(
            {
                dialect: "sqlite",
                storage: ":memory:",
                logging: false,
                sync: { force: true }
            }
        )

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should return a list of products", async () => {
        // ARRANGE
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository)

        const product1 = ProductFactory.create("Product One", 1, 'a');
        const product2 = ProductFactory.create("Product Two", 2, 'a');

        await productRepository.create(product1 as Product);
        await productRepository.create(product2 as Product);

        // ACT
        const result = await usecase.execute({});

        // ASSERT
        expect(result.products.length).toBe(2);

        expect(result.products[0].id).toBe(product1.id);
        expect(result.products[0].name).toBe(product1.name);
        expect(result.products[0].price).toBe(product1.price);

        expect(result.products[1].id).toBe(product2.id);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].price).toBe(product2.price);
    });

});