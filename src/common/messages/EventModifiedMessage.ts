import { EventState } from "./EventState";
import { EventMessage } from "./EventMessage";

export interface EventModifiedMessage extends EventMessage {
  type: "EventModifiedMessage";
  state: EventState;
}
