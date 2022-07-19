import { EventPublisher, MetaEvent } from "./EventPublisher";
import { EventMessage } from "../messages/EventMessage";

type EventSubscriber = (
  message: EventMessage,
  metaEvent: MetaEvent
) => Promise<void>;

export class SimpleEventPublisher implements EventPublisher {
  subscribers: EventSubscriber[] = [];
  id: number = 0;

  async publish(message: EventMessage): Promise<void> {
    const currentId = this.id++;

    await Promise.all(
      this.subscribers.map((x) => x(message, { id: currentId }))
    ).catch((err) => `Failed to process ${message} because of ${err}`);
  }

  subscribe(callback: EventSubscriber): void {
    this.subscribers.push(callback);
  }
}
