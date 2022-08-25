import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "John Doe",
    new Address("Street One", 1, "Zip One", "City One")
);

const customer2 = CustomerFactory.createWithAddress(
    "Doe John",
    new Address("Street Two", 2, "Zip Two", "City Two")
);

const mockRepository = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        update: jest.fn(),
    };
}

describe("Unit Test - Customer List", () => {
    it("Should return all customers", async () => {
        const repository = mockRepository();
        const useCase = new ListCustomerUseCase(repository);
        const output = await useCase.execute({});

        expect(output.customers.length).toBe(2);

        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
        expect(output.customers[0].address.number).toBe(customer1.address.number);
        expect(output.customers[0].address.city).toBe(customer1.address.city);
        expect(output.customers[0].address.zip).toBe(customer1.address.zip);

        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
        expect(output.customers[1].address.number).toBe(customer2.address.number);
        expect(output.customers[1].address.city).toBe(customer2.address.city);
        expect(output.customers[1].address.zip).toBe(customer2.address.zip);
    });
})