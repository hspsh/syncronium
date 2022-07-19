import "dotenv/config";

import { MeetupAdapter } from "./meetup/MeetupAdapter";
import { SimpleEventPublisher } from "./common/publisher/SimpleEventPublisher";
import { DiscordAdapter } from "./discord/DiscordAdapter";

// Our application should look like this:
export async function runApplication() {
  const meetup_group_name = process.env.MEETUP_GROUP_NAME || "";
  const meetup_poll_interval = process.env.MEETUP_POLL_INTERVAL_MINUTES || "5";

  const eventPublisher = new SimpleEventPublisher();

  await DiscordAdapter.createWithSqlite(eventPublisher);
  const meetupAdapter = await MeetupAdapter.createWithSQlite(
    eventPublisher,
    meetup_group_name
  );

  meetupAdapter.trigger();

  setInterval(() => {
    meetupAdapter.trigger();
  }, parseInt(meetup_poll_interval) * 60 * 1000);
}

runApplication();
