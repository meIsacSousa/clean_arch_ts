"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./address"));
const customer_1 = __importDefault(require("./customer"));
describe("Customer unit tests", () => {
    it("Should throw an error when id is empty", () => {
        expect(() => {
            let customer = new customer_1.default("", "Isac");
        }).toThrowError("Id is required");
    });
    it("Should throw an error when name is empty", () => {
        expect(() => {
            let customer = new customer_1.default("1", "");
        }).toThrowError("Name is required");
    });
    it("Should change name", () => {
        // Arrange
        const customer = new customer_1.default("1", "Isac");
        // Act
        customer.changeName("Samuel");
        // assert
        expect(customer.name).toBe("Samuel");
    });
    it("Should activate customer", () => {
        // Arrange
        const customer = new customer_1.default("1", "Isac");
        const address = new address_1.default("Rua Vamos que vamos", 7, "12345-678", "Mossoró");
        customer.Address = address;
        //act
        customer.activate();
        // assert
        expect(customer.isActive()).toBe(true);
    });
    it("Should deactivate customer", () => {
        // Arrange
        const customer = new customer_1.default("1", "Isac");
        const address = new address_1.default("Rua Vamos que vamos", 7, "12345-678", "Mossoró");
        customer.Address = address;
        //act
        customer.activate();
        customer.deactivate();
        // assert
        expect(customer.isActive()).toBe(false);
    });
    it("Should throw an error when address is not defined during a customer activate", () => {
        // Arrange
        const customer = new customer_1.default("1", "Isac");
        // act & assert
        expect(() => {
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });
});
