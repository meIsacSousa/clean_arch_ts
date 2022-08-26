import Product from "./product";

describe("Produc unit test", () => {
    it("Should throw an error when id is empty", () => {
        expect(() => {
            const _product = new Product("", "Product 1", 100);
        }).toThrowError("product: Id is required");
    });

    it("Should throw an error when name is empty", () => {
        expect(() => {
            const _product = new Product("1", "", 100);
        }).toThrowError("product: Name is required");
    });

    it("Should throw an error when price is less than 1", () => {
        expect(() => {
            const _product = new Product("1", "Product 1", 0);
        }).toThrowError("product: Price must be greater than 0");
    });

    it("Should throw an error when id and name are empty and price is less than 1", () => {
        expect(() => {
            const _product = new Product("", "", 0);
        }).toThrowError("product: Id is required, product: Name is required, product: Price must be greater than 0");
    });


    it("Must change product name", () => {
        const product = new Product("1", "Product 1", 1);
        product.changeName("Product 2");
        expect(product.name).toEqual("Product 2");
    });


    it("Must change product price", () => {
        const product = new Product("1", "Product 1", 1);
        product.changePrice(150);
        expect(product.price).toEqual(150);
    });
});