import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/orderItem.model";

export default class OrderRepository {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map(i => ({
                id: i.id,
                name: i.name,
                price: i.price,
                productId: i.productId,
                quantity: i.quantity,
            }))
        }, { include: [{ model: OrderItemModel }] });
    }
}