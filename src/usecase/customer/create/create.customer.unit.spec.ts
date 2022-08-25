import CreateCustomerUseCase from "./create.customer.usecase";

const mockRepository = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    };
}


describe("unit Test - Create Customer Use Case", () => {
    it("Should create a customer", async () => {
        const customerRepository = mockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const input = {
            name: "John Doe",
            address: {
                street: "Street",
                number: 1,
                city: "City",
                zip: "12345"
            }
        }

        const output = {
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                city: input.address.city,
                zip: input.address.zip
            }
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });


    it("Should throw an error when name is missing", async () => {
        const customerRepository = mockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const input = {
            name: "",
            address: {
                street: "Street",
                number: 1,
                city: "City",
                zip: "12345"
            }
        }

        expect(() => usecase.execute(input)).rejects.toThrowError("Name is required");
    });

    it("Should throw an error when address is invalid", async () => {
        const customerRepository = mockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const input = {
            name: "John Doe",
            address: {
                street: "",
                number: 1,
                city: "City",
                zip: "12345"
            }
        }

        expect(() => usecase.execute(input)).rejects.toThrowError("Invalid Street");
    });
});