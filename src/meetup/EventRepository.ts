import { Knex } from "knex";
import MeetupEvent from "./MeetupEvent";

export interface DatabaseEntry {
  id: Number;
  summary: String;
  uid: String;
  lastModified: Date;
}

export interface MeetupEventRepository {
  addEvent(meetupEvent: MeetupEvent): Promise<void>;

  findById(externalId: string): Promise<MeetupEvent | null>;
}

export class KnexMeetupEventRepository implements MeetupEventRepository {
  private constructor(protected db: Knex) {}

  private async migrate() {
    if (await this.db.schema.hasTable("events")) return;

    await this.db.schema.createTableIfNotExists("events", (table) => {
      table.increments();
      table.string("summary");
      table.string("uid");
      table.dateTime("lastModified");
      table.timestamps();
    });
  }
  async addEvent(meetupEvent: MeetupEvent): Promise<void> {}
  async findById(externalId: string): Promise<MeetupEvent | null> {
    return null;
  }

  async getAll(): Promise<DatabaseEntry[]> {
    return await this.db<DatabaseEntry>("events").where("id");
  }

  static async create(knex: Knex): Promise<KnexMeetupEventRepository> {
    const repo = new KnexMeetupEventRepository(knex);
    await repo.migrate();
    return repo;
  }
}
