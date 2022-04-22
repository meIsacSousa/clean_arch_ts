import Product from "./product";

describe("Produc unit test", () => {
    it("Should throw an error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Product 1", 100);
        }).toThrowError("Id is required");
    });

    it("Should throw an error when name is empty", () => {
        expect(() => {
            const product = new Product("1", "", 100);
        }).toThrowError("Name is required");
    });

    it("Should throw an error when value is less than 1", () => {
        expect(() => {
            const product = new Product("1", "Product 1", 0);
        }).toThrowError("Price should be greater than 0");
    });


    it("Must change product name", () => {
        const product = new Product("1", "Product 1", 1);
        product.changeName("Product 2");
        expect(product.name).toEqual("Product 2");
    });


    it("Must change product name", () => {
        const product = new Product("1", "Product 1", 1);
        product.changePrice(150);
        expect(product.price).toEqual(150);
    });
});