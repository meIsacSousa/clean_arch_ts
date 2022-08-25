import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customerRepository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usercase";

describe("Integration test - find customer use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should find a customer", async () => {
        // ARRANGE
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository)

        const customer = new Customer("1", "John Doe");
        const address = new Address("Street", 1, "12345", "City");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const input = { id: "1" };
        const output = {
            id: "1",
            name: "John Doe",
            address: {
                street: "Street",
                number: 1,
                city: "City",
                zip: "12345"
            }
        }

        // ACT
        const result = await usecase.execute(input);

        // ASSERT
        expect(result).toEqual(output);
    });


});