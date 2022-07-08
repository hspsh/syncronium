import MeetupAdapter from "./services/meetup/MeetupAdapter";
import knex from "knex";
import { SimpleEventPublisher } from "./common/publisher/SimpleEventPublisher";
import { DiscordAdapter } from "./discord/DiscordAdapter";

// Our application should look like this:
export async function runApplication() {
  const eventPublisher = new SimpleEventPublisher();

  await DiscordAdapter.createWithSqlite(eventPublisher);
}

async function main() {
  const conn = knex({
    client: "better-sqlite3",
    connection: {
      filename: "./storage/events.sqlite",
    },
  });

  const meetupAdapter = new MeetupAdapter(conn);
  meetupAdapter.createDatabaseIfNotExists();

  const events = await meetupAdapter.fetchMeetupEvents(
    "turkusowe-śniadania-o-biznesie-inaczej"
  );
}

main();
