import SendEmalWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-created-handler";
import EventDispatcher from "./event-dispatcher";

describe("Domain Events Tests", () => { 
    it("Should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmalWhenProductIsCreatedHandler();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    });
});