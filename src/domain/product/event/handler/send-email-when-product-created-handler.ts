import IEventHandler from "../../../@shared/event/IEventHandler";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmalWhenProductIsCreatedHandler implements IEventHandler<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log(`Sending email ...`);
    }
}