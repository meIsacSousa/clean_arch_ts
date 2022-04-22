"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("./order"));
const order_item_1 = __importDefault(require("./order_item"));
describe("Order unit tests", () => {
    it("Should throw an error when id is empty", () => {
        expect(() => {
            const orderItem = new order_item_1.default("1", "name", 1, "p1");
            const order = new order_1.default("", "1", [orderItem]);
        }).toThrowError("Id is required");
    });
    it("Should throw an error when customerId is empty", () => {
        expect(() => {
            const orderItem = new order_item_1.default("1", "name", 1, "p1", 2);
            const order = new order_1.default("1", "", [orderItem]);
        }).toThrowError("CustomerId is required");
    });
    it("Should throw an error when items is empty", () => {
        expect(() => {
            const order = new order_1.default("1", "1", []);
        }).toThrowError("Items need to have at least 1 item");
    });
    it("Should calculate total", () => {
        // arrange & act
        const orderItem = new order_item_1.default("1", "name", 10, "p1", 2);
        const orderItem2 = new order_item_1.default("2", "name2", 15, "p1", 2);
        const order = new order_1.default("1", "1", [orderItem, orderItem2]);
        // assert
        expect(order.total()).toBe(50);
    });
    it("Must thrpw an error if items quantity is less than 1", () => {
        expect(() => {
            const item = new order_item_1.default("1", "name", 10, "2", 0);
        }).toThrowError("Quantity must be greater than 0");
    });
});
