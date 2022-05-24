import Address from "../../entity/address";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerChangedAddressEvent from "./customer-changed-adress.event";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLogHandler from "./handler/send-console-log-handler";
import SendConsoleLog1Handler from "./handler/send-console-log1-handler";
import SendConsoleLog2Handler from "./handler/send-console-log2-handler";

describe("Customer Events Tests", () => {

    it("Should console messages from both handlers of customerCreatedEvent", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        const spyConsole = jest.spyOn(console, "log");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toStrictEqual(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toStrictEqual(eventHandler2);

        const event = new CustomerCreatedEvent({
            id: 'C1',
            name: "Customer",
        });

        eventDispatcher.notify(event);
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
        expect(spyConsole).toHaveBeenCalledWith("Esse é o primeiro console.log do evento: CustomerCreated");
        expect(spyConsole).toHaveBeenCalledWith("Esse é o segundo console.log do evento: CustomerCreated");
    })

    it("Should console message from handler of customerChangedAddressEvent", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogHandler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyConsole = jest.spyOn(console, "log");

        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toStrictEqual(eventHandler);

        const address = new Address("Rua", 10, "99999-999", "Cidade");

        const event = new CustomerChangedAddressEvent({
            id: "C1",
            name: "Customer",
            address: address.toString()
        });

        eventDispatcher.notify(event);
        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyConsole).toHaveBeenCalledWith(`Endereço do cliente: C1, Customer alterado para: ${address.toString()}`);
    })


});