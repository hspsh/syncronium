import { EventCreatedMessage } from "../common/messages/EventCreatedMessage";
import { EventModifiedMessage } from "../common/messages/EventModifiedMessage";
import { EventState } from "../common/messages/EventState";

export default class MeetupEvent {
  constructor(
    public summary: string,
    public description: string,
    // public created: Date,
    // public geo: [Number, Number],
    public location: string,
    public url: string,
    public uid: string,
    public lastModified: Date,
    // public dtStamp: Date,
    public dtStart: Date,
    public dtEnd: Date
  ) {}

  toEventCreatedMessage() {
    return new EventCreatedMessage(
      new EventState(
        this.uid,
        this.url,
        this.summary,
        this.description,
        "image",
        this.dtStart.toISOString(),
        this.dtEnd.toISOString(),
        this.location
      )
    );
  }

  toEventModifiedMessage() {
    return new EventModifiedMessage(
      new EventState(
        this.uid,
        this.url,
        this.summary,
        this.description,
        "image",
        this.dtStart.toISOString(),
        this.dtEnd.toISOString(),
        this.location
      )
    );
  }
}
