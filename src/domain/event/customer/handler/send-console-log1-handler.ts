import IEventHandler from "../../@shared/IEventHandler";
import CustomerCreatedEvent from "../customer-created.event";


export default class SendConsoleLog1Handler implements IEventHandler<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
}