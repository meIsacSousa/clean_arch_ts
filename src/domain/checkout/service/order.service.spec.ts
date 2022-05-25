
import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";


describe("Order service unit teste", () => {
    it("Should get total of all orders", () => {
        const orderItem1 = new OrderItem("orit1", "first order", 20, "pr1", 1);
        const orderItem2 = new OrderItem("orit2", "second order", 25, "pr2", 2);
        const orderItem3 = new OrderItem("orit3", "third order", 30, "pr3", 1);
        const orderItem4 = new OrderItem("orit4", "fourth order", 35, "pr4", 2);

        const order1 = new Order("or1", "cus1", [orderItem1, orderItem2]);
        const order2 = new Order("or2", "cus2", [orderItem3, orderItem4]);

        const total = OrderService.getTotal([order1, order2]);
        expect(total).toBe(170);
    });


    it("Should place an order", () => {
        const customer = new Customer("c1", "Customer One");
        const item1 = new OrderItem("oi1", "Item One", 20, "p1", 1);

        const order = OrderService.placeOrder(customer, [item1]);
        
        expect(customer.rewardPoints).toBe(10);
        expect(order.total()).toBe(20);
    });
});