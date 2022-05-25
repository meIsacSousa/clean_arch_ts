
import { randomUUID } from "crypto";
import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export default class OrderService {
    static getTotal(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        
        if(items.length === 0) {
            throw new Error("Order must have at least one item");
        }

        const order = new Order(randomUUID(), customer.id, items);
        
        let points = order.total() / 2;
        customer.addRewardPoints(points);

        return order;
    }
}