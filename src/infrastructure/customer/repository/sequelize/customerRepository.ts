import Customer from "../../../../domain/customer/entity/customer";
import ICustomerRepository from "../../../../domain/customer/repository/ICustomerRepository";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements ICustomerRepository {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        }, { where: { id: entity.id } });
    }

    async find(id: string): Promise<Customer> {
        const customerModel = await CustomerModel.findOne({ where: { id } });

        if (customerModel) {
            const customer = new Customer(customerModel.id, customerModel.name);
            customer.changeAddress({
                street: customerModel.street,
                number: customerModel.number,
                zip: customerModel.zipcode,
                city: customerModel.city
            } as Address
            );

            customer.addRewardPoints(customerModel.rewardPoints);
            if (customerModel.active) customer.activate();

            return customer;
        }

        return null as any;
    }


    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        return customerModels.map(c => {
            const customer = new Customer(c.id, c.name);
            customer.changeAddress({
                street: c.street,
                number: c.number,
                zip: c.zipcode,
                city: c.city
            } as Address);

            customer.addRewardPoints(c.rewardPoints);
            if (c.active) customer.activate();

            return customer;
        });
    }
}