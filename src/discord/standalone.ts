import { DiscordService } from "./DiscordService";
import { DiscordEventConsumer } from "./EventConsumer";
import { KnexLinkedEventRepository } from "./EventRepository";
import { knex } from "knex";
import { EventCreatedMessage } from "../common/messages/EventCreatedMessage";
import { EventState } from "../common/messages/EventState";
import { EventModifiedMessage } from "../common/messages/EventModifiedMessage";
import "dotenv/config";

const token = process.env.DISCORD_API_KEY || "";
const guildId = "621300560481615892";

async function main() {
  const db = knex({
    client: "better-sqlite3",
    connection: {
      filename: "./discord.db",
    },
  });

  const eventRepository = await KnexLinkedEventRepository.create(db);
  const discordService = await DiscordService.create(guildId, token);

  console.log("GOING FULL");

  const eventConsumer = new DiscordEventConsumer(
    discordService,
    eventRepository
  );

  await eventConsumer
    .handle(
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

  await eventConsumer
    .handle(
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
