import product from "../../domain/entity/product";
import IProductRepository from "../../domain/repository/IProductRepository";

export default class productRepository implements IProductRepository {
    create(entity: product): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(entity: product): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<product> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<product[]> {
        throw new Error("Method not implemented.");
    }
}