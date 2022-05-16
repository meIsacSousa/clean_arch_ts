import IEvent from "../@shared/IEvent";

export default class ProductCreatedEvent implements IEvent {
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData
    }

}