import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John Doe",
    new Address("Street", 1, "Zip", "City")
);

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit test - Customer update use case", () => {
    it("Should update customer", async () => {
        const repository = mockRepository();
        const useCase = new UpdateCustomerUseCase(repository);
        const input = {
            id: customer.id,
            name: "John updated",
            address: {
                street: "Street updated",
                number: 2,
                city: "City updated",
                zip: "Zip updated",
            }
        };


        const output = await useCase.execute(input);
        expect(output).toEqual(input);
    });
});