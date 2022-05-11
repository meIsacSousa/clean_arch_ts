import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customerRepository";

describe("Customer Repository unit tests", () => {
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

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a customer", async () => {
        const customer = new Customer("1", "Isac");
        customer.changeAdress({
            street: "street",
            number: 2,
            zip: "99999-999",
            city: "cidade"
        } as Address);

        customer.addRewardPoints(10);
        customer.activate();

        await new CustomerRepository().create(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Isac",
            street: "street",
            number: 2,
            zipcode: "99999-999",
            city: "cidade",
            active: true,
            rewardPoints: 10,
        });
    });


    it("Should update a costumer", async () => {
        const customer = new Customer("1", "Isac");
        customer.changeAdress({
            street: "street",
            number: 2,
            zip: "99999-999",
            city: "cidade"
        } as Address);

        customer.addRewardPoints(10);
        customer.activate();

        await new CustomerRepository().create(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Isac",
            street: "street",
            number: 2,
            zipcode: "99999-999",
            city: "cidade",
            active: true,
            rewardPoints: 10,
        });

        customer.changeName("Samuel");
        customer.changeAdress({
            street: "new street",
            number: 5,
            zip: "11111-111",
            city: "new cidade"
        } as Address);

        await new CustomerRepository().update(customer);
        const customerModelUpdated = await CustomerModel.findOne({ where: { id: "1" } });
        expect(customerModelUpdated?.toJSON()).toStrictEqual({
            id: "1",
            name: "Samuel",
            street: "new street",
            number: 5,
            zipcode: "11111-111",
            city: "new cidade",
            active: true,
            rewardPoints: 10,
        });
    });


    it("Should find a product", async () => {
        const customer = new Customer("1", "Isac");
        customer.changeAdress({
            street: "street",
            number: 2,
            zip: "99999-999",
            city: "cidade"
        } as Address);

        customer.addRewardPoints(10);
        customer.activate();

        await new CustomerRepository().create(customer);

        const customerFound = await new CustomerRepository().find(customer.id);
        expect(customerFound).toStrictEqual(customer);
    });

    it("Should be returned all customers", async () => {
        const customerOne = new Customer("1", "Isac");
        customerOne.changeAdress({
            street: "street",
            number: 2,
            zip: "99999-999",
            city: "cidade"
        } as Address);
        customerOne.addRewardPoints(10);
        customerOne.activate();

        const customerTwo = new Customer("2", "Isac");
        customerTwo.changeAdress({
            street: "street",
            number: 2,
            zip: "99999-999",
            city: "cidade"
        } as Address);
        customerTwo.addRewardPoints(10);
        customerTwo.activate();

        await new CustomerRepository().create(customerOne);
        await new CustomerRepository().create(customerTwo);

        const customers = await new CustomerRepository().findAll();

        expect(customers).toEqual([customerOne, customerTwo]);
    });
});