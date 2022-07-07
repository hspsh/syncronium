import {EventMessage} from "../messages/EventMessage";

export interface EventPublisher {
    publish(message: EventMessage): Promise<void>

    subscribe(callback: (message: EventMessage) => Promise<void>): void
}