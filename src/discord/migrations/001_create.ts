import { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTableIfNotExists("linked_events", (builder) => {
    builder.string("discord_event_id", 256);
    builder.string("external_event_id", 256);
    builder.primary(["external_event_id"]);
    builder.unique(["discord_event_id"]);
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable("linked_events");
}
