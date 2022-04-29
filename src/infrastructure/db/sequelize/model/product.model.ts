import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "products",
})
export default class ProductModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;
    
    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false})
    declare price: number;
}