import IProduct from "../../../../domain/product/entity/IProduct";
import Product from "../../../../domain/product/entity/product";
import IProductRepository from "../../../../domain/product/repository/IProductRepository";
import ProductModel from "./product.model";

export default class ProductRepository implements IProductRepository {
    async create(entity: IProduct): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
        });
    }

    async update(entity: IProduct): Promise<void> {
        await ProductModel.update({
            name: entity.name,
            price: entity.price,
        }, { where: { id: entity.id } });
    }

    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { id } });

        if (productModel) return new Product(productModel.id, productModel.name, productModel.price);

        return null as any;
    }

    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();
        return productModels.map(p => new Product(p.id, p.name, p.price));
    }
}