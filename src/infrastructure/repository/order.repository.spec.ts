import { Model, Sequelize } from "sequelize-typescript";
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

    it("Should return all orders", async () => {
        // Definindo uma ordem
        const customer = new Customer("c1", "Isac");
        const address = new Address("Rua 1", 1, "99999-999", "Cidade");
        customer.changeAdress(address);
        await new CustomerRepository().create(customer);

        const product = new Product("p1", "Product 1", 10);
        await new ProductRepository().create(product);

        const orderItem = new OrderItem("oi1", product.name, product.price, product.id, 2);
        const order1 = new Order("123", customer.id, [orderItem]);
        await OrderModel.create({
            id: order1.id,
            customerId: order1.customerId,
            total: order1.total(),
            items: order1.items.map(i => ({
                id: i.id,
                name: i.name,
                price: i.price / i.quantity,
                productId: i.productId,
                quantity: i.quantity,
            } as OrderItemModel))
        }, { include: [{ model: OrderItemModel }] });

        // Definindo uma segunda ordem
        const customer2 = new Customer("c2", "Isac");
        const address2 = new Address("Rua 2", 2, "88888-888", "Cidade 2");
        customer2.changeAdress(address2);
        await new CustomerRepository().create(customer2);

        const product2 = new Product("p2", "Product 2", 20);
        await new ProductRepository().create(product2);

        const orderItem2 = new OrderItem("oi2", product2.name, product2.price, product2.id, 3);
        const order2 = new Order("321", customer2.id, [orderItem2]);
        await OrderModel.create({
            id: order2.id,
            customerId: order2.customerId,
            total: order2.total(),
            items: order2.items.map(i => ({
                id: i.id,
                name: i.name,
                price: i.price / i.quantity,
                productId: i.productId,
                quantity: i.quantity,
            } as OrderItemModel))
        }, { include: [{ model: OrderItemModel }] });


        const orders = await new OrderRepository().findAll();
        expect(orders).toEqual([order1, order2]);
    });


    it("Should find an order ", async () => {
        const customer = new Customer("c1", "Isac");
        const address = new Address("Rua 1", 1, "99999-999", "Cidade");
        customer.changeAdress(address);
        await new CustomerRepository().create(customer);

        const product = new Product("p1", "Product 1", 10);
        await new ProductRepository().create(product);

        const orderItem = new OrderItem("oi1", product.name, product.price, product.id, 2);
        const order = new Order("123", customer.id, [orderItem]);

        await OrderModel.create({
            id: order.id,
            customerId: order.customerId,
            total: order.total(),
            items: order.items.map(i => ({
                id: i.id,
                name: i.name,
                price: i.price / i.quantity, // o get do price retorna o valor do produto multiplicado pela quantidade
                productId: i.productId,
                quantity: i.quantity,
            } as OrderItemModel))
        }, { include: [{ model: OrderItemModel }] });

        const orderFound = await new OrderRepository().find(order.id);

        expect(orderFound).toStrictEqual(order);
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
                    price: product.price,
                    orderId: order.id,
                    productId: product.id,
                    quantity: orderItem.quantity
                }
            ]
        });
    });


    it("Should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Isac");
        const address = new Address("Rua 1", 1, "99999-999", "Cidade");
        customer.changeAdress(address);

        await customerRepository.create(customer);

        const product = new Product("p1", "Product 1", 10);
        await new ProductRepository().create(product);

        const orderItem = new OrderItem("oi1", product.name, product.price, product.id, 2);
        const order = new Order("123", customer.id, [orderItem]);

        await OrderModel.create({
            id: order.id,
            customerId: order.customerId,
            total: order.total(),
            items: order.items.map(i => ({
                id: i.id,
                name: i.name,
                price: i.price / i.quantity,
                productId: i.productId,
                quantity: i.quantity,
            } as OrderItemModel))
        }, { include: [{ model: OrderItemModel }] });

        const newCustomer = new Customer("c2", "Samuel");
        const newAddress = new Address("Rua 2", 2, "55555-555", "Cidade");
        newCustomer.changeAdress(newAddress);
        await customerRepository.create(newCustomer);
        
        order.changeCustomer(newCustomer.id);
        await new OrderRepository().update(order);
        const orderUpdated = await OrderModel.findOne({ where: { id: order.id }, include: [{ model: OrderItemModel }] })

        expect(orderUpdated?.toJSON()).toStrictEqual({
            id: "123",
            customerId: newCustomer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: product.price,
                    orderId: order.id,
                    productId: product.id,
                    quantity: orderItem.quantity
                }
            ]
        });
    });
});