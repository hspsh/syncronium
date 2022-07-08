import { Knex, knex } from "knex";
import {
  KnexLinkedEventRepository,
  LinkedEventRepository,
} from "./EventRepository";

describe("given in memory sqlite knex instance and KnexEventRepository", () => {
  let db: Knex | undefined;
  let eventRepository: LinkedEventRepository;

  beforeEach(async () => {
    db = knex({
      client: "better-sqlite3",
      connection: {
        filename: ":memory:",
      },
    });
    eventRepository = await KnexLinkedEventRepository.create(db);
  });

  afterEach(() => db?.destroy());

  it("when linked event is added then can be fetched", async () => {
    const linkedEvent = { externalId: "B", discordId: "A" };

    await eventRepository.linkEvent(linkedEvent);

    const event = await eventRepository.findByExternalId("B");
    expect(event).toEqual(linkedEvent);
  });
});
