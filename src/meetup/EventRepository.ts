import { Knex } from "knex";
import MeetupEvent from "./MeetupEvent";

export interface DatabaseEntry {
  id: Number;
  summary: String;
  uid: String;
  lastModified: Date;
}

export interface MeetupEventRepository {
  getAll(): Promise<DatabaseEntry[]>;
  addEvent(event: MeetupEvent): Promise<void>;
  updateEvent(uid: string, event: MeetupEvent): Promise<void>;
}

export class KnexMeetupEventRepository implements MeetupEventRepository {
  private constructor(protected db: Knex) {}

  private async migrate() {
    if (await this.db.schema.hasTable("events")) return;

    await this.db.schema.createTable("events", (table) => {
      table.increments();
      table.string("summary");
      table.string("uid");
      table.dateTime("lastModified", { precision: 6 });
    });
  }

  async getAll(): Promise<DatabaseEntry[]> {
    return (await this.db.select("*").from<DatabaseEntry>("events")).map(
      (event) => {
        event.lastModified = new Date(event.lastModified); //convert timestap to Date
        return event;
      }
    );
  }

  async addEvent(event: MeetupEvent): Promise<void> {
    await this.db<DatabaseEntry>("events").insert({
      uid: event.uid,
      summary: event.summary,
      lastModified: event.lastModified,
    });
  }

  async updateEvent(uid: string, event: MeetupEvent): Promise<void> {
    await this.db<DatabaseEntry>("events")
      .update({
        uid: event.uid,
        summary: event.summary,
        lastModified: event.lastModified,
      })
      .where({
        uid,
      });
  }

  static async create(knex: Knex): Promise<KnexMeetupEventRepository> {
    const repo = new KnexMeetupEventRepository(knex);
    await repo.migrate();
    return repo;
  }
}
