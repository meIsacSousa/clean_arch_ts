import IEvent from "./IEvent";
import IEventDispatcher from "./IEventDispatcher";
import IEventHandler from "./IEventHandler";

export default class EventDispatcher implements IEventDispatcher {

    private eventHandlers: { [eventName: string]: IEventHandler[] } = {};

    get getEventHandlers(): { [eventName: string]: IEventHandler[] } {
        return this.eventHandlers;
    }

    notify(event: IEvent): void {
        throw new Error("Method not implemented.");
    }

    register(eventName: string, eventHandler: IEventHandler): void {
        if (!this.eventHandlers[eventName]) this.eventHandlers[eventName] = [];

        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: IEventHandler): void {
        throw new Error("Method not implemented.");
    }
    
    unregisterAll(): void {
        throw new Error("Method not implemented.");
    }
}