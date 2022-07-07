class EventCreatedMessage extends EventMessage {
    constructor(public state: EventState) {
        super();
    }
}
