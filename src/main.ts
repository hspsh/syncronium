import fetchMeetupEvents from "./services/meetup/iCalService";

async function main() {
  const events = await fetchMeetupEvents(
    "turkusowe-śniadania-o-biznesie-inaczej"
  );
  console.log(events);
}

main();
