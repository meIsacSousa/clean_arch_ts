import IProductRepository from "../../../domain/product/repository/IProductRepository";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const product = await this.productRepository.find(input.id);

        if (!product) {
            throw new Error("Product not found");
        }

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}