import { MeetupAdapter } from "./meetup/MeetupAdapter";
import { SimpleEventPublisher } from "./common/publisher/SimpleEventPublisher";
import { DiscordAdapter } from "./discord/DiscordAdapter";

// Our application should look like this:
export async function runApplication() {
  const eventPublisher = new SimpleEventPublisher();

  await DiscordAdapter.createWithSqlite(eventPublisher);
}

async function main() {
  const eventPublisher = new SimpleEventPublisher();

  const meetupAdapter = await MeetupAdapter.createWithSQlite(
    eventPublisher,
    "turkusowe-śniadania-o-biznesie-inaczej"
  );

  meetupAdapter.trigger();

  setInterval(() => {
    meetupAdapter.trigger();
  }, 15 * 60 * 1000); //15 minutes
}

main();
