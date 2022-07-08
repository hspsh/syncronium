import { EventMessage } from "../common/messages/EventMessage";
import { EventCreatedMessage } from "../common/messages/EventCreatedMessage";
import { EventModifiedMessage } from "../common/messages/EventModifiedMessage";
import { DiscordService } from "./DiscordService";
import { LinkedEventRepository } from "./EventRepository";
import { SimpleDiscordEvent } from "./DiscordEvent";
import { EventState } from "../common/messages/EventState";

export interface EventConsumer {
  handle(eventMessage: EventMessage): Promise<void>;
}

export class DiscordEventConsumer implements EventConsumer {
  constructor(
    protected discordService: DiscordService,
    protected eventRepository: LinkedEventRepository
  ) {}

  async handle(eventMessage: EventMessage): Promise<void> {
    switch (true) {
      case eventMessage instanceof EventCreatedMessage:
        await this.handleCreated(eventMessage as EventCreatedMessage);
        break;
      case eventMessage instanceof EventModifiedMessage:
        await this.handleModified(eventMessage as EventModifiedMessage);
        break;
      default:
        console.warn(`${eventMessage} is not recognized`);
    }
  }

  async handleCreated(event: EventCreatedMessage) {
    const simpleDiscordEvent: SimpleDiscordEvent = this.toSimpleDiscordEvent(
      event.state
    );

    if (await this.eventRepository.findByExternalId(event.state.id)) {
      throw Error("Event already created");
    }

    const id = await this.discordService.createEvent(simpleDiscordEvent);

    await this.eventRepository.linkEvent({
      discordId: id,
      externalId: event.state.id,
    });
  }

  async handleModified(event: EventModifiedMessage) {
    const linkedEvent = await this.eventRepository.findByExternalId(
      event.state.id
    );

    if (!linkedEvent) {
      throw Error(`Event was never created for external id ${event.state.id}`);
    }

    const discordEvent = await this.discordService.findEventById(
      linkedEvent.discordId
    );

    if (!discordEvent) {
      throw Error(
        `Event does not exist for external id ${event.state.id} linking to ${linkedEvent.discordId}`
      );
    }

    await this.discordService.modifyEvent(
      discordEvent,
      this.toSimpleDiscordEvent(event.state)
    );
  }

  toSimpleDiscordEvent(eventState: EventState): SimpleDiscordEvent {
    return new SimpleDiscordEvent(
      eventState.title,
      eventState.description || "default description",
      eventState.location,
      new Date(eventState.startDate),
      new Date(eventState.endDate)
    );
  }
}
