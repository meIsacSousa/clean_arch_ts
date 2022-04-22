"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    constructor(street, number, zip, city) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        this.validate();
    }
    validate() {
        if (this._street.length === 0)
            throw new Error("Invalid Street");
        if (this._zip.length === 0)
            throw new Error("Invalid Zip code");
        if (this._city.length === 0)
            throw new Error("Invalid City");
        if (this._number < 0)
            throw new Error("Invalid Number");
    }
    toString() {
        return `${this._street}, ${this._number}, ${this._city} - ${this._zip}`;
    }
}
exports.default = Address;
