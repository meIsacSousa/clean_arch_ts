import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import IOrderRepository from "../../domain/repository/IOrderRepository";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/orderItem.model";

export default class OrderRepository implements IOrderRepository {

    // TODO: colocar o update para orderItem
    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
        }, { where: { id: entity.id } });

    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({ where: { id }, include: [{ model: OrderItemModel }] });

        if (orderModel) {
            const items = orderModel.items.map(i => new OrderItem(i.id, i.name, i.price, i.productId, i.quantity));
            return new Order(orderModel.id, orderModel.customerId, items);
        }

        return null as any;
    }

    async findAll(): Promise<Order[]> {
        const orderModel = await OrderModel.findAll({ include: [{ model: OrderItemModel }] });

        return orderModel.map(o => {
            const items = o.items.map(i => new OrderItem(i.id, i.name, i.price, i.productId, i.quantity));
            return new Order(o.id, o.customerId, items);
        });
    }

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: this.orderItemToModelMapper(entity.items)
        }, { include: [{ model: OrderItemModel }] });
    }

    private orderItemToModelMapper(items: OrderItem[]): OrderItemModel[] {

        return items.map(i => {
            return OrderItemModel.build({
                id: i.id,
                name: i.name,
                price: i.price / i.quantity,
                productId: i.productId,
                quantity: i.quantity
            });
        })
    }

    private orderItemModelToEntityMapper(item: OrderItemModel): OrderItem {
        return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity);
    }
}