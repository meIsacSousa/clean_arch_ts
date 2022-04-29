import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

// agregago de customer
let customer = new Customer("123", "Isac Sousa");
const address = new Address("Rua do frango", 10, "12345-678", "Mossoró");

customer.address = address;
customer.activate();


// agregago de order
let item1 = new OrderItem("1", "item 1", 10, "1", 1);
let item2 = new OrderItem("2", "item 2", 20, "1", 1);

const order = new Order("1", "123", [item1, item2]);