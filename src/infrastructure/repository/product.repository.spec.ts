import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/entity/product";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./productRepository";

describe("Product Repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
            define: {
                timestamps: false
            }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("Should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });
        expect(productModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        });
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });
        expect(productModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        });


        product.changeName("Product new name");
        product.changePrice(150);
        await productRepository.update(product);

        const productModelUpdated = await ProductModel.findOne({ where: { id: "1" } });
        expect(productModelUpdated?.toJSON()).toStrictEqual({
            id: "1",
            name: "Product new name",
            price: 150
        });
    });


    it("Should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const productFound = await productRepository.find(product.id);
        expect(productFound).toStrictEqual(product);
    });

    it("Should be returned all products", async () => {
        const productRepository = new ProductRepository();
        const productOne = new Product("1", "Product 1", 100);
        const productTwo = new Product("2", "Product 2", 200);

        await productRepository.create(productOne);
        await productRepository.create(productTwo);

        const products = await productRepository.findAll();

        expect(products).toEqual([productOne, productTwo]);
    });

});