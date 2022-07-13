import ical from "node-ical";
import knex from "knex";

import { EventMessage } from "../common/messages/EventMessage";
import MeetupEvent from "./MeetupEvent";
import {
  MeetupEventRepository,
  KnexMeetupEventRepository,
  DatabaseEntry,
} from "./EventRepository";

export interface MeetupAdapter {
  getUpdates(groupName: String): Promise<EventMessage[]>;
}

export class MeetupAdapter implements MeetupAdapter {
  constructor(protected eventRepository: MeetupEventRepository) {}

  async getUpdates(groupName: String) {
    const freshEvents = await this.fetchMeetupEvents(groupName);
    const lastEvents = await this.eventRepository.getAll();

    return this.compareEvents(lastEvents, freshEvents);
  }

  async fetchMeetupEvents(groupName: String): Promise<MeetupEvent[]> {
    const url = encodeURI(
      `https://www.meetup.com/pl-PL/${groupName}/events/ical/`
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

  static async createWithSQlite() {
    const db = knex({
      client: "better-sqlite3",
      connection: {
        filename: "./meetup.db",
      },
    });

    const meetupRepo = await KnexMeetupEventRepository.create(db);
    const meetupAdapter = new MeetupAdapter(meetupRepo);

    return meetupAdapter;
  }
}
