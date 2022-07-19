import { Knex } from "knex";

export interface LinkedEventRepository {
  linkEvent(linkedEvent: LinkedEvent): Promise<void>;

  findByExternalId(externalId: string): Promise<LinkedEvent | null>;
}

export interface LinkedEvent {
  externalId: string;
  discordId: string;
}

export class KnexLinkedEventRepository implements LinkedEventRepository {
  private constructor(protected knex: Knex) {}

  private async migrate() {
    await this.knex.migrate.latest({ directory: "src/discord/migrations" });
  }

  findByExternalId(externalId: string): Promise<LinkedEvent | null> {
    return this.knex
      .select("discord_event_id")
      .from<LinkedEvent>("linked_events")
      .where("external_event_id", "=", externalId)
      .then((x) =>
        x.length
          ? { discordId: x[0].discord_event_id, externalId: externalId }
          : null
      );
  }

  linkEvent(linkedEvent: LinkedEvent): Promise<void> {
    return this.knex
      .insert({
        discord_event_id: linkedEvent.discordId,
        external_event_id: linkedEvent.externalId,
      })
      .into("linked_events");
  }

  static async create(knex: Knex): Promise<KnexLinkedEventRepository> {
    const repository = new KnexLinkedEventRepository(knex);
    await repository.migrate();
    return repository;
  }
}
