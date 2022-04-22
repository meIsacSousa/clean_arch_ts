"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, customerId, items) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }
    total() {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }
    validate() {
        if (this._id.length === 0)
            throw new Error("Id is required");
        if (this._customerId.length === 0)
            throw new Error("CustomerId is required");
        if (this._items.length < 1)
            throw new Error("Items need to have at least 1 item");
    }
}
exports.default = Order;
