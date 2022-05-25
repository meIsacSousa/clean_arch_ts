import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
    it("Should create a product type A", () => {
        const product = ProductFactory.create("Coffee", 1, "a");

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Coffee");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("Product");
    })

    it("Should create a product type B", () => {
        const product = ProductFactory.create("Water", 1, "b");

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Water B");
        expect(product.price).toBe(2);
        expect(product.constructor.name).toBe("ProductB");
    })


    it("Should throw an error when product type is not supported", () => {
        expect(() => ProductFactory.create("Coffee", 1, "h")).toThrowError("Product type not supported");
    });
})