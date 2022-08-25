import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import IProductRepository from "../../../domain/product/repository/IProductRepository";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product = ProductFactory.create(input.name, input.price, "a");
        await this.productRepository.create(product as Product);
        
        return {
            id: product.id,
            name: product.name,
            price: product.price
        };
    }
}