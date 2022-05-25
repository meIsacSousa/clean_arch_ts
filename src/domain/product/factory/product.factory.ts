import IProduct from "../entity/IProduct";
import { randomUUID } from 'crypto';
import Product from "../entity/product";
import ProductB from "../entity/productB";

export default class ProductFactory {
    public static create(name: string, price: number, type: string): IProduct {
        switch (type) {
            case 'a':
                return new Product(randomUUID(), name, price);
            case 'b':
                return new ProductB(randomUUID(), name, price);
            default:
                throw new Error("Product type not supported");
        }
    }
}