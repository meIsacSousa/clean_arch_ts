"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./entity/address"));
const customer_1 = __importDefault(require("./entity/customer"));
const order_1 = __importDefault(require("./entity/order"));
const order_item_1 = __importDefault(require("./entity/order_item"));
// agregago de customer
let customer = new customer_1.default("123", "Isac Sousa");
const address = new address_1.default("Rua do frango", 10, "12345-678", "Mossoró");
customer.Address = address;
customer.activate();
// agregago de order
let item1 = new order_item_1.default("1", "item 1", 10, "1", 1);
let item2 = new order_item_1.default("2", "item 2", 20, "1", 1);
const order = new order_1.default("1", "123", [item1, item2]);
