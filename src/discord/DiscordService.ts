import {
  Client,
  GuildScheduledEvent,
  Snowflake,
  TextChannel,
} from "discord.js";

import { REST } from "@discordjs/rest";
import { SimpleDiscordEvent } from "./DiscordEvent";

export class DiscordService {
  client?: Client = undefined;

  protected constructor(public guildId: string) {}

  init(token: string) {
    return new Promise<void>((resolve, reject) => {
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

        resolve();
      });

      client.on("error", (error) => {
        console.error(error);
        reject(error);
      });

      client.on("warn", (msg) => {
        console.warn(msg);
      });

      client.login(token);
    });
  }

  async sendMessage(msg: string) {
    // hsp pomorze - 621300560481615892
    this.client?.guilds.fetch(this.guildId).then((guild) => {
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
      .fetch(this.guildId)
      .then((x) => x.scheduledEvents.create(event.toCreate()))
      .then((x) => x.id)
      .catch((x) => console.error(x)) as Promise<Snowflake>;
  }

  async modifyEvent(
    oldEvent: GuildScheduledEvent,
    event: SimpleDiscordEvent
  ): Promise<void> {
    await this.client?.guilds
      .fetch(this.guildId)
      .then((x) => x.scheduledEvents.edit(oldEvent, event.toModify()))
      .then((x) => x.id)
      .catch((x) => console.error(x));
  }

  async findEventById(
    id: Snowflake
  ): Promise<GuildScheduledEvent | null | undefined> {
    return this.client?.guilds
      .fetch(this.guildId)
      .then((x) => x.scheduledEvents.fetch())
      .then((x) => x.find((event) => event.id == id));
  }

  static async create(guildId: string, token: string) {
    const service = new DiscordService(guildId);
    await service.init(token);
    return service;
  }
}
