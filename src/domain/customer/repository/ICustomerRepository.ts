import Customer from "../entity/customer";
import IRepository from "../../@shared/repository/IRepository";

export default interface ICustomerRepository extends IRepository<Customer> {}