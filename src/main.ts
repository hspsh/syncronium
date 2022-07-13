import { MeetupAdapter } from "./meetup/MeetupAdapter";
import { SimpleEventPublisher } from "./common/publisher/SimpleEventPublisher";
import { DiscordAdapter } from "./discord/DiscordAdapter";

// Our application should look like this:
export async function runApplication() {
  const eventPublisher = new SimpleEventPublisher();

  await DiscordAdapter.createWithSqlite(eventPublisher);
}

async function main() {
  const meetupAdapter = await MeetupAdapter.createWithSQlite();

  await meetupAdapter.fetchMeetupEvents(
    "turkusowe-śniadania-o-biznesie-inaczej"
  );
}

main();
