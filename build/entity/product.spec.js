"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("./product"));
describe("Produc unit test", () => {
    it("Should throw an error when id is empty", () => {
        expect(() => {
            const product = new product_1.default("", "Product 1", 100);
        }).toThrowError("Id is required");
    });
    it("Should throw an error when name is empty", () => {
        expect(() => {
            const product = new product_1.default("1", "", 100);
        }).toThrowError("Name is required");
    });
    it("Should throw an error when value is less than 1", () => {
        expect(() => {
            const product = new product_1.default("1", "Product 1", 0);
        }).toThrowError("Price should be greater than 0");
    });
    it("Must change product name", () => {
        const product = new product_1.default("1", "Product 1", 1);
        product.changeName("Product 2");
        expect(product.name).toEqual("Product 2");
    });
    it("Must change product name", () => {
        const product = new product_1.default("1", "Product 1", 1);
        product.changePrice(150);
        expect(product.price).toEqual(150);
    });
});
