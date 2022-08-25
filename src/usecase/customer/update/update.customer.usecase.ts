import ICustomerRepository from "../../../domain/customer/repository/ICustomerRepository";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
    constructor(private repository: ICustomerRepository) { }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const customer = await this.repository.find(input.id);

        customer.changeName(input.name);
        customer.changeAddress(new Address(
            input.address.street,
            input.address.number,
            input.address.zip,
            input.address.city,
        ));

        await this.repository.update(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                city: customer.address.city,
                zip: customer.address.zip,
            }
        };
    }
}