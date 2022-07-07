import { EventMessage } from "./EventMessage";
import { EventState } from "./EventState";

export class EventCreatedMessage extends EventMessage {
  constructor(public state: EventState) {
    super();
  }
}