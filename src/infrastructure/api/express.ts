import express from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import ProductModel from "../product/repository/sequelize/product.model";
import { customerRoute } from "./routes/customer";
import { productRoute } from "./routes/product";

export const app = express();

app.use(express.json());

// Registrando rotas
app.use("/customers", customerRoute);
app.use("/products", productRoute);

export let sequelize: Sequelize;

const setupDB = async () => {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    });

    sequelize.addModels([CustomerModel, ProductModel]);
    await sequelize.sync();
};

setupDB();