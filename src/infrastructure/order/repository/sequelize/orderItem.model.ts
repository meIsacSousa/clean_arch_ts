import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";
import ProductModel from "../../../product/repository/sequelize/product.model";


@Table({
    tableName: "order_items",
})
export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    declare productId: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare orderId: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @Column({ allowNull: false })
    declare quantity: number;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;
}