import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/orderItem.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customerRepository";
import OrderRepository from "./orderRepository";
import ProductRepository from "./productRepository";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
            define: {
                timestamps: false
            }
        });

        sequelize.addModels([OrderModel, CustomerModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("Should create a new order", async () => {
        const customer = new Customer("c1", "Isac");

        const address = new Address("Rua 1", 1, "99999-999", "Cidade");
        customer.changeAdress(address);
        await new CustomerRepository().create(customer);

        const product = new Product("p1", "Product 1", 10);
        await new ProductRepository().create(product);


        const orderItem = new OrderItem("oi1", product.name, product.price, product.id, 2);
        const order = new Order("123", customer.id, [orderItem]);

        await new OrderRepository().create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });
        expect(orderModel?.toJSON()).toStrictEqual({
            id: "123",
            customerId: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    orderId: order.id,
                    productId: product.id,
                    quantity: orderItem.quantity
                }
            ]
        });
    });
});