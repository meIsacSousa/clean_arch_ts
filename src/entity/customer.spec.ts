import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("Should throw an error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Isac");
        }).toThrowError("Id is required");
    });

    it("Should throw an error when name is empty", () => {
        expect(() => {
            let customer = new Customer("1", "");
        }).toThrowError("Name is required");
    });

    it("Should change name", () => {
        // Arrange
        const customer = new Customer("1", "Isac");

        // Act
        customer.changeName("Samuel");

        // assert
        expect(customer.name).toBe("Samuel");
    });


    it("Should activate customer", () => {
        // Arrange
        const customer = new Customer("1", "Isac");
        const address = new Address("Rua Vamos que vamos", 7, "12345-678", "Mossoró");
        customer.Address = address;

        //act
        customer.activate();
        
        
        // assert
        expect(customer.isActive()).toBe(true);
    });


    it("Should deactivate customer", () => {
        // Arrange
        const customer = new Customer("1", "Isac");
        const address = new Address("Rua Vamos que vamos", 7, "12345-678", "Mossoró");
        customer.Address = address;

        //act
        customer.activate();
        customer.deactivate();
        
        
        // assert
        expect(customer.isActive()).toBe(false);
    });


    it("Should throw an error when address is not defined during a customer activate", () => {
        // Arrange
        const customer = new Customer("1", "Isac");        
        
        // act & assert
        expect(() => {
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });

    it("Should add reward points", () => {
        const customer = new Customer("1", "Isac");
        expect(customer.rewardPoints).toBe(0);
        
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
    });
});