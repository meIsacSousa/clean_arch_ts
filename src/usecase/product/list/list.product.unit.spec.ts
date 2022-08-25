import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("Product One", 1, 'a');
const product2 = ProductFactory.create("Product Two", 2, 'a');


const mockRepository = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        update: jest.fn(),
    }
};


describe("Unit test - list product use case", () => {
    it("should return a list of products", async () => {
        const repository = mockRepository();
        const useCase = new ListProductUseCase(repository);
        const result = await useCase.execute({});

        expect(result.products.length).toBe(2);
        
        expect(result.products[0].id).toBe(product1.id);
        expect(result.products[0].name).toBe(product1.name);
        expect(result.products[0].price).toBe(product1.price);

        expect(result.products[1].id).toBe(product2.id);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].price).toBe(product2.price);

    });
});