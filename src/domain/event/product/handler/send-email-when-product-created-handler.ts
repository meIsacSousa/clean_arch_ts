import IEvent from "../../@shared/IEvent";
import IEventHandler from "../../@shared/IEventHandler";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmalWhenProductIsCreatedHandler implements IEventHandler<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log(`Sending email ...`);
    }
}