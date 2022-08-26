import CreateProductUseCase from "./create.product.usecase";

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
};

describe("Unit test - Create Product", () => {
    it("Should create a product", async () => {
        const productRepository = mockRepository();
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
        const productRepository = mockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const input = {
            name: "",
            price: 100
        }

        expect(() => usecase.execute(input)).rejects.toThrowError("product: Name is required");
    });

    it("Should throw an error when price < 0", async () => {
        const productRepository = mockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product",
            price: -1
        }

        expect(() => usecase.execute(input)).rejects.toThrowError("product: Price must be greater than 0");
    });
});    