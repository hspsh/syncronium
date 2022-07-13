import ical from "node-ical";
import knex from "knex";

import MeetupEvent from "./MeetupEvent";
import {
  MeetupEventRepository,
  KnexMeetupEventRepository,
} from "./EventRepository";

export default class MeetupAdapter {
  constructor(protected eventRepository: MeetupEventRepository) {}

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

  // compareEvents(oldEvents: DatabaseEntry[], newEvents: MeetupEvent[]) { }

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
