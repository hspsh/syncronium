import { Client, TextChannel } from "discord.js";
import { REST } from "@discordjs/rest";

const token =
  "OTk0Njg5MzU3MTQxMjYyNDE3.GnPY66.WUPpn1ENfpc6bEGdgZUjJm4pzuJhdpbUtx87I4";

export class DiscordAdapter {
  constructor() {
    this.init();
  }

  async init() {
    const rest = new REST({ version: "10" }).setToken(token);

    rest.on("restDebug", (event) => {
      console.log(event);
    });

    console.log("init finished");

    let client = new Client({
      intents: ["GUILD_SCHEDULED_EVENTS", "GUILD_MESSAGES"],
    });

    client.on("ready", () => {
      console.log("DISCORD: READY!!!");
      console.log(client.guilds.fe);
      client.guilds.fetch("944205611686584320");
      client.guilds.valueOf().forEach((guild) => {
        const channel = guild.channels.valueOf().find((x) => x.name == "bots");
        if (channel && channel.type == "GUILD_TEXT") {
          const textCh = channel as TextChannel;
          textCh
            .send("Dzien Dobry")
            .then((x) => console.log(x))
            .catch((x) => console.log(x));
        }
      });
    });

    client.on("error", (error) => {
      console.error(error);
    });

    client.on("debug", (msg) => {
      console.log(msg);
    });

    return client.login(token);
  }
}
