import Product from "../entity/product";

export default class ProductService {
    static increasePrice(products: Product[], percentage: number): Product[] {
        products.forEach(p => {
            p.changePrice(p.price + p.price * (percentage/100));
        });

        return products;
    }
}