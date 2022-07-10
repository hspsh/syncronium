import { sendTweet, sendTweetResponse } from "./TwitterService";

export async function sendEventTweet(
  name: string,
  description: string,
  location: string,
  startDate: Date,
  endDate: Date
): Promise<string> {
  try {
    const tweetMessage = `${name}\n${description}\nLokalizacja: ${location}\nPoczątek: ${startDate.toISOString()} Koniec: ${endDate.toISOString()}`;
    const res = await sendTweet(tweetMessage);
    return res.id_str;
  } catch (err) {
    throw err;
  }
}

export async function sendEventTweetUpdate(
  name: string,
  description: string,
  location: string,
  startDate: Date,
  endDate: Date,
  id: string
): Promise<string> {
  try {
    const tweetMessage = `${name}\n${description}\nLokalizacja: ${location}\nPoczątek: ${startDate.toISOString()} Koniec: ${endDate.toISOString()}`;
    const res = await sendTweetResponse(tweetMessage, id);
    return res.id_str;
  } catch (err) {
    throw err;
  }
}
