import { EventMessage } from "./EventMessage";
import { EventState } from "./EventState";

export class EventModifiedMessage extends EventMessage {
  constructor(public state: EventState) {
    super();
  }
}
