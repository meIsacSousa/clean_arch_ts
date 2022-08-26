import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customerRepository";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());
    try {

        const input = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                zip: req.body.address.zip,
            }
        }

        const customer = await usecase.execute(input);
        res.status(201).send(customer);

    } catch (error) {
        res.status(500).send(error);
    }
});

customerRoute.get("/", async (_req: Request, res: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    try {
        const input = {};

        const output = await usecase.execute(input);

        res.format({
            json: () => res.status(200).send(output),
            xml: () => res.status(200).send(CustomerPresenter.ListXML(output)),
        });

    } catch (error) {
        res.status(500).send(error);
    }
});