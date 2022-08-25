import { AfterDestroy, Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/productRepository";
import FindProductUseCase from "./find.product.usecase";


describe("Integration test - Find Product", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should find a product", async () => {
        // ARRANGE
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        const product = ProductFactory.create("Product", 1, 'a');
        await productRepository.create(product as Product);

        // ACT
        const result = await usecase.execute({ id: product.id });

        // ASSERT
        expect(result).toEqual({
            id: product.id,
            name: product.name,
            price: product.price,
        });
    });

    it("Should throw an error when product not found", async () => {
        // ARRANGE
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        // ACT & ASSERT
        await expect(() => usecase.execute({ id: "2" })).rejects.toThrow("Product not found");
    })
});