// ENTITY -> REGRAS DE NEGÓCIO (Complexidade de negócio);
// ENTITY / MODEL -> Atender a infraestrutura (ORM) (Complexidade acidental);

import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";


export default class Customer extends Entity {
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super(id);
        this._name = name;

        this.validate();
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get address(): Address {
        return this._address;
    }

    get name(): string {
        return this._name;
    }

    isActive(): boolean {
        return this._active;
    }

    validate() {
        if (this._id.length === 0) this.notification.addError({
            message: "Id is required",
            context: "customer"
        });

        if (this._name.length === 0) this.notification.addError({
            message: "Name is required",
            context: "customer"
        });

        if (this.notification.hasErrors())
            throw new NotificationError(this.notification.errors);
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    changeAddress({ street, number, zip, city }: Address) {
        this.address = new Address(street, number, zip, city);
        this.validate();
    }

    activate(): void {
        if (!this._address) throw new Error("Address is mandatory to activate a customer");
        this._active = true;
    }

    deactivate(): void {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    set address(address: Address) {
        this._address = address;
    }
}