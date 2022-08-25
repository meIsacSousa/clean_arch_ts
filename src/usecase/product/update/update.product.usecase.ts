import IProductRepository from "../../../domain/product/repository/IProductRepository";
import { InputProductUpdateDto, OuputProductUpdateDto } from "./update.product.dto";

export default class UpdateProductUseCase {
    constructor(private repository: IProductRepository) { }

    async execute(input: InputProductUpdateDto): Promise<OuputProductUpdateDto> {
        const product = await this.repository.find(input.id);

        if (!product) {
            throw new Error("Product not found");
        }

        product.changeName(input.name);
        product.changePrice(input.price);

        await this.repository.update(product);
        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}