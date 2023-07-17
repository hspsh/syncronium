import "dotenv/config";

import { SimpleEventPublisher } from "./publisher/SimpleEventPublisher";
import { DiscordAdapter } from "./discord/DiscordAdapter";
import { MeetupApiAdapter } from "./meetup/MeetupApiAdapter";

function safeRunWithInterval(cb: () => void | Promise<any>, interval: number) {
  const safeCb = async () => {
    try {
      await cb();
    } catch (error) {
      console.error(error);
      console.error("Z nią się zawsze zgodzić trzeba");
    }
  };

  safeCb();
  return setInterval(safeCb, interval);
}

// Our application should look like this:
export async function runApplication() {
  const meetup_group_name = process.env.MEETUP_GROUP_NAME || "hspomorze";
  const meetup_poll_interval = process.env.MEETUP_POLL_INTERVAL_MINUTES || "5";

  const eventPublisher = new SimpleEventPublisher();

  await DiscordAdapter.createWithSqlite(eventPublisher);
  const meetupAdapter = await MeetupApiAdapter.createWithSQlite(
    eventPublisher,
    meetup_group_name
  );

  const interval = parseInt(meetup_poll_interval) * 60 * 1000;
  safeRunWithInterval(() => meetupAdapter.trigger(), interval);
}

runApplication();
