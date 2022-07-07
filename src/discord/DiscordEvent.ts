import {
  GuildScheduledEventCreateOptions,
  GuildScheduledEventEditOptions,
} from "discord.js";

export class SimpleDiscordEvent {
  tainted = false;

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public location: string,
    public startDate: Date,
    public endDate: Date
  ) {}

  taint() {
    this.tainted = true;
  }

  toCreate(): GuildScheduledEventCreateOptions {
    return {
      name: this.name,
      scheduledStartTime: this.startDate.toISOString(),
      scheduledEndTime: this.endDate.toISOString(),
      privacyLevel: "GUILD_ONLY",
      entityType: "EXTERNAL",
      description: this.description,
      entityMetadata: { location: this.location },
    };
  }

  toModify(): GuildScheduledEventEditOptions<any, any> {
    return {
      name: this.name,
      scheduledStartTime: this.startDate.toISOString(),
      scheduledEndTime: this.endDate.toISOString(),
      privacyLevel: "GUILD_ONLY",
      entityType: "EXTERNAL",
      description: this.description,
      entityMetadata: { location: this.location },
    };
  }
}
