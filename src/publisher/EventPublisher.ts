import { EventMessage } from "../common/messages/EventMessage";

export interface EventPublisher {
  publish(message: EventMessage): Promise<void>;

  subscribe(
    callback: (message: EventMessage, metadata: MetaEvent) => Promise<void>
  ): void;
}

export interface MetaEvent {
  id: number;
}
