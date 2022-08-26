import express from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import { customerRoute } from "./routes/customer";

export const app = express();

app.use(express.json());

// Registrando rotas
app.use("/customers", customerRoute);

export let sequelize: Sequelize;

const setupDB = async () => {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
};

setupDB();