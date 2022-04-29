import { Sequelize } from "sequelize-typescript";

describe("Product Repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    
    it("", () => {})
});