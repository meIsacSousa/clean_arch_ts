import Order from "../entity/order";
import IRepository from "./IRepository";

export default interface IOrderRepository extends IRepository<Order> { }