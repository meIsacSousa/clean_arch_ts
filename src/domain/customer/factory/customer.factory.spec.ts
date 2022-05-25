import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
    it("Should create a customer", () => {
        let customer = CustomerFactory.create("Isac");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Isac");
        expect(customer.address).toBeUndefined();
    });


    it("should create a customer with an address", () => {
        let address = new Address("Rua", 10, "99999-999", "São Paulo");
        let customer = CustomerFactory.createWithAddress("Isac", address);
        
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Isac");
        expect(customer.address).toStrictEqual(address);
    });

})