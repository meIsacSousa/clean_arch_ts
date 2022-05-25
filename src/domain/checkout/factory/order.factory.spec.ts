import { randomUUID } from "crypto";
import OrderFactory from "./order.factory";

describe("Order factory unit test", () => {
    it("Should create an order", () => {
        const orderProps = {
            id: randomUUID(),
            customerId: randomUUID(),
            items: [
                { id: randomUUID(), name: "Product One", productId: randomUUID(), quantity: 1, price: 100 },
                { id: randomUUID(), name: "Product Two", productId: randomUUID(), quantity: 1, price: 100 }
            ]
        };

        const order = OrderFactory.create(orderProps);

        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toEqual(orderProps.customerId);
        expect(order.items.length).toBe(2);
    });
});