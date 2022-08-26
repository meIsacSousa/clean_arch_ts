import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("Product", 100, "a");

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}


describe("Unit Test - Update Product use case", () => {
    it("Should update a product", async () => {
        const repository = mockRepository();
        const usecase = new UpdateProductUseCase(repository);

        const input = {
            id: product.id,
            name: "Name Updated",
            price: 388,
        }

        const output = {
            id: product.id,
            name: input.name,
            price: input.price,
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });


    it("Should throw an error when product not found", async () => {
        const repository = mockRepository();
        const usecase = new UpdateProductUseCase(repository);

        const input = {
            id: "1",
            name: product.name,
            price: product.price,
        }

        repository.find.mockReturnValue(Promise.resolve(null));
        await expect(usecase.execute(input)).rejects.toThrowError("Product not found");
    });
});   