import ical from "node-ical";
import knex from "knex";

import { EventMessage } from "../common/messages/EventMessage";
import MeetupEvent from "./MeetupEvent";
import {
  MeetupEventRepository,
  KnexMeetupEventRepository,
  DatabaseEntry,
} from "./EventRepository";
import { EventPublisher } from "../common/publisher/EventPublisher";

export interface MeetupAdapterI {
  trigger(): Promise<void>;
}

export class MeetupAdapter implements MeetupAdapterI {
  constructor(
    protected eventRepository: MeetupEventRepository,
    protected publisher: EventPublisher,
    protected groupName: string
  ) {}

  async trigger() {
    const messages: EventMessage[] = await this.getUpdates();
    messages.forEach((message) => this.publisher.publish(message));
  }

  protected async getUpdates() {
    const freshEvents = await this.fetchMeetupEvents();
    const lastEvents = await this.eventRepository.getAll();

    return this.compareEvents(lastEvents, freshEvents);
  }

  protected async fetchMeetupEvents(): Promise<MeetupEvent[]> {
    const url = encodeURI(
      `https://www.meetup.com/pl-PL/${this.groupName}/events/ical/`
    );
    const eventsData = await ical.async.fromURL(url);
    const eventsList: MeetupEvent[] = [];

    for (const ev of Object.values(eventsData)) {
      if (ev.type == "VEVENT") {
        eventsList.push(
          new MeetupEvent(
            ev.summary,
            ev.description,
            ev.location,
            ev.url,
            ev.uid,
            ev.lastmodified,
            ev.start,
            ev.end
          )
        );
      }
    }

    return eventsList;
  }

  protected compareEvents(
    oldEvents: DatabaseEntry[],
    freshEvents: MeetupEvent[]
  ): EventMessage[] {
    const returnList: EventMessage[] = [];

    freshEvents.forEach((freshEvent) => {
      const matchingOldEvent = oldEvents.find(
        (oldEvent) => oldEvent.uid === freshEvent.uid
      );

      if (matchingOldEvent === undefined) {
        returnList.push(freshEvent.toEventCreatedMessage());
      } else {
        if (matchingOldEvent.lastModified !== freshEvent.lastModified)
          returnList.push(freshEvent.toEventModifiedMessage);
      }
    });

    return returnList;
  }

  static async createWithSQlite(publisher: EventPublisher, groupName: string) {
    const db = knex({
      client: "better-sqlite3",
      connection: {
        filename: "./meetup.db",
      },
    });

    const meetupRepo = await KnexMeetupEventRepository.create(db);
    const meetupAdapter = new MeetupAdapter(meetupRepo, publisher, groupName);

    return meetupAdapter;
  }
}
