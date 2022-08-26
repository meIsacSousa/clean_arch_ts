import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import IProduct from "./IProduct";

// Simulação para uso de factory
export default class ProductB extends Entity implements IProduct {
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super(id);
        this._name = name;
        this._price = price;
        this.validate();
    }

    get name(): string {
        return this._name + " B";
    }

    get price(): number {
        return this._price * 2;
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    changePrice(price: number): void {
        this._price = price;
        this.validate();
    }

    validate() {
        if (this._id.length === 0)
            this.notification.addError({
                message: "Id is required",
                context: "product"
            });

        if (this._name.length === 0)
            this.notification.addError({
                message: "Name is required",
                context: "product"
            });

        if (this._price <= 0 || !this._price)
            this.notification.addError({
                message: "Price must be greater than 0",
                context: "product"
            });

        if (this.notification.hasErrors())
            throw new NotificationError(this.notification.errors);
    }

}