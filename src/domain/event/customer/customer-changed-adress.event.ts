import IEvent from "../@shared/IEvent";

export default class CustomerChangedAddressEvent implements IEvent {
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData
    }
}