import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("Product", 1, 'a');

const mockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test - Find Product", () => {
    it("Should return a product", async () => {
        const repository = mockRepository();
        const usecase = new FindProductUseCase(repository);

        const input = {
            id: product.id
        }

        const output = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });


    it("Should throw an error when product not found", async () => {
        const repository = mockRepository();
        const usecase = new FindProductUseCase(repository);

        const input = {
            id: "2"
        }

        repository.find.mockReturnValue(Promise.resolve(null));

        await expect(() => usecase.execute(input)).rejects.toThrow("Product not found");
    });
});