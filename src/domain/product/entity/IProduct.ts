import Entity from "../../@shared/entity/entity.abstract";

export default interface IProduct extends Entity {
    get name(): string;
    get price(): number;
    changePrice(price: number): void;
    changeName(name: string): void;
}