import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usercase";


const customer = new Customer("1", "John Doe");
const address = new Address("Street", 1, "12345", "City");
customer.changeAddress(address);

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit test - find a customer", () => {
    it("Should find a customer", async () => {
        const customerRepository = mockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

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

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });


    it("Should throw an error when customer not found", async () => {
        const customerRepository = mockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = { id: "2" };

        customerRepository.find.mockReturnValue(Promise.resolve(null));


        expect(() => usecase.execute(input)).rejects.toThrow("Customer not found");
    });
});