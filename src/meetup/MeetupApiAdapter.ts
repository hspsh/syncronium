import MeetupEvent from "./MeetupEvent";
import {
  MeetupEventRepository,
  KnexMeetupEventRepository,
  DatabaseEntry,
} from "./EventRepository";
import { EventPublisher } from "../publisher/EventPublisher";
import { createSqliteDb } from "../common/utils/db";

import axios from "axios";

// https://api.meetup.com/hspomorze/events
interface ComparisonResult {
  newEvents: MeetupEvent[];
  modifiedEvents: MeetupEvent[];
}

export interface MeetupAdapterI {
  trigger(): Promise<void>;
}

export class MeetupApiAdapter implements MeetupAdapterI {
  constructor(
    protected eventRepository: MeetupEventRepository,
    protected publisher: EventPublisher,
    protected groupName: string
  ) {}

  async trigger() {
    const events = await this.getUpdates();

    await this.publishEvents(events);
    await this.storeEvents(events);
  }

  protected async getUpdates() {
    const freshEvents = await this.fetchMeetupEvents();
    const lastEvents = await this.eventRepository.getAll();

    return this.compareEvents(lastEvents, freshEvents);
  }

  protected async fetchMeetupEvents(): Promise<MeetupEvent[]> {
    const url = encodeURI(`https://api.meetup.com/${this.groupName}/events`);
    const response = await axios.get(url);
    const data = response.data as Array<any>;

    return data.map(
      (x) =>
        new MeetupEvent(
          x.name as string,
          x.description as string,
          x.venue.name as string,
          x.link as string,
          x.id as string,
          new Date(x.updated as number),
          new Date(x.time as number),
          new Date(((x.time as number) + x.duration) as number)
        )
    );
  }

  protected compareEvents(
    oldEvents: DatabaseEntry[],
    freshEvents: MeetupEvent[]
  ): ComparisonResult {
    const newEvents: MeetupEvent[] = [];
    const modifiedEvents: MeetupEvent[] = [];

    freshEvents.forEach((freshEvent) => {
      const matchingOldEvent = oldEvents.find(
        (oldEvent) => oldEvent.uid === freshEvent.uid
      );

      if (matchingOldEvent === undefined) {
        newEvents.push(freshEvent);
      } else {
        if (matchingOldEvent.lastModified !== freshEvent.lastModified)
          modifiedEvents.push(freshEvent);
      }
    });

    return {
      newEvents,
      modifiedEvents,
    };
  }

  protected async publishEvents(events: ComparisonResult): Promise<void> {
    const handlers: Promise<any>[] = [];

    events.newEvents.forEach((event) => {
      const message = event.toEventCreatedMessage();
      const handler = this.publisher.publish(message);
      handlers.push(handler);
    });
    events.modifiedEvents.forEach((event) => {
      const message = event.toEventModifiedMessage();
      const handler = this.publisher.publish(message);
      handlers.push(handler);
    });

    await Promise.all(handlers);
  }

  protected async storeEvents(events: ComparisonResult): Promise<void> {
    const handlers: Promise<any>[] = [];

    events.newEvents.forEach((event) => {
      const handler = this.eventRepository.addEvent(event);
      handlers.push(handler);
    });
    events.modifiedEvents.forEach((event) => {
      const handler = this.eventRepository.updateEvent(event.uid, event);
      handlers.push(handler);
    });

    await Promise.all(handlers);
  }

  static async createWithSQlite(publisher: EventPublisher, groupName: string) {
    const db = createSqliteDb("meetup.db");

    const meetupRepo = await KnexMeetupEventRepository.create(db);
    const meetupAdapter = new MeetupApiAdapter(
      meetupRepo,
      publisher,
      groupName
    );

    return meetupAdapter;
  }
}
