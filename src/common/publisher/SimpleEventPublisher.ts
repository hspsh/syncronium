import {EventPublisher} from "./EventPublisher";
import {EventMessage} from "../messages/EventMessage";

type EventSubscriber = (message: EventMessage) => Promise<void>

export class SimpleEventPublisher implements EventPublisher {
    subscribers: EventSubscriber[] = []

    async publish(message: EventMessage): Promise<void> {
        await Promise.all(this.subscribers.map(x => x(message)))
    }

    subscribe(callback: EventSubscriber): void {
        this.subscribers.push(callback)
    }
}