import IEventHandler from "../../@shared/IEventHandler";
import CustomerChangedAdressEvent from "../customer-changed-adress.event";

export default class SendConsoleLogHandler implements IEventHandler<CustomerChangedAdressEvent> {
    handle(event: CustomerChangedAdressEvent): void {
        console.log(`Endereço do cliente: ${event.eventData?.id}, ${event.eventData?.name} alterado para: ${event.eventData?.address}`);
    }
}