import Product from "../../../domain/product/entity/product";
import IProductRepository from "../../../domain/product/repository/IProductRepository";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    constructor(private productRepository: IProductRepository) {}

    async execute(_input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();
        return ListProductMapper.toOutPut(products);
    }
}

class ListProductMapper {
    static toOutPut(product: Product[]): OutputListProductDto {
        return {
            products: product.map(p => ({
                id: p.id,
                name: p.name,
                price: p.price,
            }))
        };
    }
}