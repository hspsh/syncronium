import { EventPublisher } from "./EventPublisher";
import { SimpleEventPublisher } from "./SimpleEventPublisher";
import { EventModifiedMessage } from "../common/messages/EventModifiedMessage";
import { EventState } from "../common/messages/EventState";

describe("given PersistentEventPublisher", () => {
  let eventPublisher!: EventPublisher;

  beforeEach(() => {
    eventPublisher = new SimpleEventPublisher();
  });

  describe("when event is published", () => {
    it("then will be reemitted by new eventPublisher", () => {
      eventPublisher = eventPublisher;

      const event = new EventModifiedMessage(
        new EventState("", "", "", "", "", "", "", "")
      );
      console.log(event.type());
    });
  });
});
