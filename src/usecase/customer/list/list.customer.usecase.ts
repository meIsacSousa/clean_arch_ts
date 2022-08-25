import Customer from "../../../domain/customer/entity/customer";
import ICustomerRepository from "../../../domain/customer/repository/ICustomerRepository";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    constructor(private repository: ICustomerRepository) { }

    async execute(_input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.repository.findAll();
        return ListCustomerMapper.toOutPut(customers);

    }
}


class ListCustomerMapper {
    static toOutPut(customer: Customer[]): OutputListCustomerDto {
        return {
            customers: customer.map(c => ({
                id: c.id,
                name: c.name,
                address: {
                    street: c.address.street,
                    number: c.address.number,
                    city: c.address.city,
                    zip: c.address.zip,
                }
            }))
        };
    }
}