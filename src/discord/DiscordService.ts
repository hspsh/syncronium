import {
  Client,
  GuildScheduledEvent,
  Snowflake,
  TextChannel,
} from "discord.js";
import { REST } from "@discordjs/rest";
import { SimpleDiscordEvent } from "./DiscordEvent";

const token =
  "OTk0Njg5MzU3MTQxMjYyNDE3.GA1Bmx.gNUDIOSx1F3CnlL92_1rolFVzt5G5YEtCU1RQY";

const guildId = "621300560481615892";

export class DiscordService {
  client?: Client = undefined;

  constructor() {
    this.init();
  }

  async init() {
    const rest = new REST({ version: "10" }).setToken(token);

    rest.on("restDebug", (event) => {
      console.log(event);
    });

    let client = new Client({
      intents: ["GUILDS", "GUILD_SCHEDULED_EVENTS", "GUILD_MESSAGES"],
    });

    client.on("ready", () => {
      console.log("DISCORD: READY!!!");
      this.client = client;
      this.sendMessage("Dobri Dzień");

      this.createEvent(
        new SimpleDiscordEvent(
          "",
          "BOTY WAS ZJEDZĄ",
          "TAK DOBRZE CZYTASZ, BOTY WAS ZJEDZĄ",
          "W HSP CI NIE POMORZE",
          new Date(new Date().getTime() + 1000 * 3600 * 24 * 1),
          new Date(new Date().getTime() + 1000 * 3600 * 24 * 2)
        )
      );
    });

    client.on("error", (error) => {
      console.error(error);
    });

    client.on("debug", (msg) => {
      console.log(msg);
    });

    return client.login(token);
  }

  async sendMessage(msg: string) {
    // hsp pomorze - 621300560481615892
    this.client?.guilds.fetch(guildId).then((guild) => {
      const channel = guild.channels.valueOf().find((x) => x.name == "bots");
      if (channel && channel.type == "GUILD_TEXT") {
        const textCh = channel as TextChannel;
        textCh
          .send(msg)
          .then((x) => console.log(x))
          .catch((x) => console.log(x));
      }
    });
  }

  async createEvent(event: SimpleDiscordEvent): Promise<Snowflake> {
    return this.client?.guilds
      .fetch(guildId)
      .then((x) => x.scheduledEvents.create(event.toCreate()))
      .then((x) => x.entityId)
      .catch((x) => console.error(x)) as Promise<Snowflake>;
  }

  async modifyEvent(
    oldEvent: GuildScheduledEvent,
    event: SimpleDiscordEvent
  ): Promise<void> {
    await this.client?.guilds
      .fetch(guildId)
      .then((x) => x.scheduledEvents.edit(oldEvent, event.toModify()))
      .then((x) => x.entityId)
      .catch((x) => console.error(x));
  }
}
