import MeetupAdapter from "./services/meetup/MeetupAdapter";
import knex from "knex";

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
