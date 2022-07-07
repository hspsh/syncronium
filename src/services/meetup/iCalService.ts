import MeetupEvent from "./MeetupEvent";
import ical from "node-ical";

export default async function fetchMeetupEvents(
  groupName: String
): Promise<Array<MeetupEvent>> {
  const url = encodeURI(
    `https://www.meetup.com/pl-PL/${groupName}/events/ical/`
  );
  const eventsData = await ical.async.fromURL(url);
  const eventsList: MeetupEvent[] = [];

  for (const ev of Object.values(eventsData)) {
    if (ev.type == "VEVENT") {
      eventsList.push(
        new MeetupEvent(
          ev.summary,
          ev.description,
          ev.location,
          ev.url,
          ev.uid,
          ev.start,
          ev.end
        )
      );
    }
  }

  return eventsList;
}
