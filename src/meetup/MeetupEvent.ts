import { EventCreatedMessage } from "../common/messages/EventCreatedMessage";
import { EventModifiedMessage } from "../common/messages/EventModifiedMessage";

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

  toEventCreatedMessage(): EventCreatedMessage {
    return {
      type: "EventCreatedMessage",
      state: {
        id: this.uid,
        link: this.url,
        title: this.summary,
        description: this.description,
        image: "image",
        startDate: this.dtStart.toISOString(),
        endDate: this.dtEnd.toISOString(),
        location: this.location,
      },
    };
  }

  toEventModifiedMessage(): EventModifiedMessage {
    return {
      type: "EventModifiedMessage",
      state: {
        id: this.uid,
        link: this.url,
        title: this.summary,
        description: this.description,
        image: "image",
        startDate: this.dtStart.toISOString(),
        endDate: this.dtEnd.toISOString(),
        location: this.location,
      },
    };
  }
}
