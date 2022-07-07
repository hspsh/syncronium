class EventModifiedMessage extends EventMessage {
    constructor(public state: EventState) {
        super();
    }
}