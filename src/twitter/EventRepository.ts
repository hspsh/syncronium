import { knex } from "knex";

const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./twitter.db",
  },
});

export interface LinkedEvent {
  externalId: string;
  twitterId: string;
}

export async function findByExternalId(
  externalId: string
): Promise<LinkedEvent | null> {
  return db
    .select("discord_event_id")
    .from<LinkedEvent>("linked_events")
    .where("external_event_id", "=", externalId)
    .then((x) =>
      x.length
        ? { twitterId: x[0].discord_event_id, externalId: externalId }
        : null
    );
}

export async function linkEvent(linkedEvent: LinkedEvent): Promise<void> {
  db.insert({
    twitter_event_id: linkedEvent.twitterId,
    external_event_id: linkedEvent.externalId,
  }).into("linked_events");
}
