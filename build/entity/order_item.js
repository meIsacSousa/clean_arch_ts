"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderItem {
    constructor(id, name, price, productId, quantity) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
        this.validate();
    }
    get price() {
        return this._price * this._quantity;
    }
    validate() {
        if (this._id.length === 0)
            throw new Error("Id is required");
        if (this._name.length === 0)
            throw new Error("Name is required");
        if (this._price < 1)
            throw new Error("Price should be greater than 0");
        if (this._quantity < 1)
            throw new Error("Quantity must be greater than 0");
    }
}
exports.default = OrderItem;
