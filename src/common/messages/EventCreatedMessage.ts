import { EventState } from "./EventState";
import { EventMessage } from "./EventMessage";

export interface EventCreatedMessage extends EventMessage {
  type: "EventCreatedMessage";
  state: EventState;
}
