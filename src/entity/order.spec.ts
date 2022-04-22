import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("Should throw an error when id is empty", () => {
        expect(() => {
            const orderItem = new OrderItem("1", "name", 1, "p1", 2);
            const order = new Order("", "1", [orderItem]);
        }).toThrowError("Id is required");
    });

    it("Should throw an error when customerId is empty", () => {
        expect(() => {
            const orderItem = new OrderItem("1", "name", 1, "p1", 2);
            const order = new Order("1", "", [orderItem]);
        }).toThrowError("CustomerId is required");
    });

    it("Should throw an error when items is empty", () => {
        expect(() => {
            const order = new Order("1", "1", []);
        }).toThrowError("Items need to have at least 1 item");
    });

    it("Should calculate total", () => {
        // arrange & act
        const orderItem = new OrderItem("1", "name", 10, "p1", 2);
        const orderItem2 = new OrderItem("2", "name2", 15, "p1", 2);
        const order = new Order("1", "1", [orderItem, orderItem2]);

        // assert
        expect(order.total()).toBe(50);
    });

    it("Must thrpw an error if items quantity is less than 1", () => {
        expect(() => {
            const item = new OrderItem("1", "name", 10, "2", 0);
        }).toThrowError("Quantity must be greater than 0")
    });
});