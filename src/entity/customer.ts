// ENTITY -> REGRAS DE NEGÓCIO (Complexidade de negócio);
// ENTITY / MODEL -> Atender a infraestrutura (ORM) (Complexidade acidental);

import Address from "./address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;

        this.validate();
    }

    get name(): string {
        return this._name;
    }

    isActive(): boolean {
        return this._active;
    }

    validate() {
        if(this._id.length === 0) throw new Error("Id is required"); 
        if(this._name.length === 0) throw new Error("Name is required");    
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    activate(): void {
        if(!this._address) throw new Error("Address is mandatory to activate a customer");
        this._active = true;
    }

    deactivate(): void {
        this._active = false;
    }

    set Address(address: Address) {
        this._address = address;
    }
}