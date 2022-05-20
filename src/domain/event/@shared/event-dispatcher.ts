import IEvent from "./IEvent";
import IEventDispatcher from "./IEventDispatcher";
import IEventHandler from "./IEventHandler";

export default class EventDispatcher implements IEventDispatcher {

    private eventHandlers: { [eventName: string]: IEventHandler[] } = {};

    get getEventHandlers(): { [eventName: string]: IEventHandler[] } {
        return this.eventHandlers;
    }

    notify(event: IEvent): void {
        const eventName = event.constructor.name;
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach((eventHandler) => {
                eventHandler.handle(event);
            });
        }
    }

    register(eventName: string, eventHandler: IEventHandler): void {
        if (!this.eventHandlers[eventName]) this.eventHandlers[eventName] = [];

        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: IEventHandler): void {
        if (this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(eventHandler);
            if (index !== -1) this.eventHandlers[eventName].splice(index, 1);
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};
    }
}