import { EventCreatedMessage } from "../common/messages/EventCreatedMessage";
import { EventState } from "../common/messages/EventState";
import { EventModifiedMessage } from "../common/messages/EventModifiedMessage";
import { SimpleEventPublisher } from "../common/publisher/SimpleEventPublisher";
import { DiscordAdapter } from "./DiscordAdapter";

async function main() {
  const eventPublisher = new SimpleEventPublisher();

  await DiscordAdapter.createWithSqlite(eventPublisher);

  await eventPublisher
    .publish(
      new EventCreatedMessage(
        new EventState(
          "dummy123",
          "http://ksidelta.com",
          "BOTY WAS JEDZĄ",
          "PRZYCHODZISZ DO DOMU I PATRZYSZ A TU BOT",
          null,
          new Date(new Date().getTime() + 1000 * 3600 * 24 * 1).toISOString(),
          new Date(new Date().getTime() + 1000 * 3600 * 24 * 2).toISOString(),
          "W TWOJEJ KUCHNI"
        )
      )
    )
    .catch((x) => console.error(x));

  await eventPublisher
    .publish(
      new EventModifiedMessage(
        new EventState(
          "dummy123",
          "http://ksidelta.com",
          "BOTY WAS JEDZĄ",
          `PRZYCHODZISZ DO DOMU I PATRZYSZ A TU BOT\n i podaje Ci czas: ${new Date().toISOString()}`,
          null,
          new Date(new Date().getTime() + 1000 * 3600 * 24 * 1).toISOString(),
          new Date(new Date().getTime() + 1000 * 3600 * 24 * 2).toISOString(),
          "W TWOJEJ KUCHNI"
        )
      )
    )
    .catch((x) => console.error(x));
}

main();
