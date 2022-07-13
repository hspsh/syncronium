import ical from "node-ical";
import { Knex } from "knex";

import MeetupEvent from "./MeetupEvent";
import DatabaseEntry from "./DatabaseEntry";

export default class MeetupAdapter {
  constructor(private db: Knex<any, unknown[]>) {}

  async doYourJob(groupName: String) {
    this.createDatabaseIfNotExists();
    const newEvents = await this.fetchMeetupEvents(groupName);
    const oldEvents = await this.readOldEventsFromDatabase();

    const reallyNewEvents = this.compareEvents(oldEvents, newEvents);
    console.log(reallyNewEvents);
  }

  async createDatabaseIfNotExists() {
    await this.db.schema.createTableIfNotExists("events", (table) => {
      table.increments();
      table.string("summary");
      table.string("uid");
      table.dateTime("lastModified");
      table.timestamps();
    });
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

  async readOldEventsFromDatabase() {
    return await this.db<DatabaseEntry>("oldEvents").where("id");
  }

  compareEvents(oldEvents: DatabaseEntry[], newEvents: MeetupEvent[]) {}
}
