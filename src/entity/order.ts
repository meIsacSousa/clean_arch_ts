import OrderItem from "./order_item";

export default class Order {
    _id: string;
    _customerId: string;
    _items: OrderItem[];
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        
        this.validate();
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item._price, 0);
    }

    validate() {
        if(this._id.length === 0) throw new Error("Id is required");
        if(this._customerId.length === 0) throw new Error("CustomerId is required");
        if(this._items.length < 1) throw new Error("Items need to have at least 1 item");
    }
}