import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("Should throw an error when id is empty", () => {
        expect(() => {
            const orderItem = new OrderItem("1", "name", 1);
            const order = new Order("", "1", [orderItem]);
        }).toThrowError("Id is required");
    });

    it("Should throw an error when customerId is empty", () => {
        expect(() => {
            const orderItem = new OrderItem("1", "name", 1);
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
        const orderItem = new OrderItem("1", "name", 10);
        const orderItem2 = new OrderItem("2", "name2", 15);
        const order = new Order("1", "1", [orderItem, orderItem2]);

        // assert
        expect(order.total()).toBe(25);

    });
});