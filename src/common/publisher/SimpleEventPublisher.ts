import { EventPublisher, MetaEvent } from "./EventPublisher";
import { EventMessage } from "../messages/EventMessage";

type EventSubscriber = (
  message: EventMessage,
  metaEvent: MetaEvent
) => Promise<void>;

export class SimpleEventPublisher implements EventPublisher {
  subscribers: EventSubscriber[] = [];

  async publish(message: EventMessage): Promise<void> {
    await Promise.all(
      this.subscribers.map((x) => x(message, { id: new Date().getTime() }))
    ).catch((err) => `Failed to process ${message} because of ${err}`);
  }

  subscribe(callback: EventSubscriber): void {
    this.subscribers.push(callback);
  }
}
