import Twitter from "twitter-api-v2";
import * as dotenv from "dotenv";

dotenv.config();

const client = new Twitter({
  appKey: process.env.TWITTER_API_KEY ? process.env.TWITTER_API_KEY : "",
  appSecret: process.env.TWITTER_API_KEY_SECRET
    ? process.env.TWITTER_API_KEY_SECRET
    : "",
  accessToken: process.env.TWITTER_ACCESS_TOKEN
    ? process.env.TWITTER_ACCESS_TOKEN
    : "",
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    ? process.env.TWITTER_ACCESS_TOKEN_SECRET
    : "",
});

export async function sendTweet(
  tweetMessage: string
): Promise<{ id_str: string }> {
  try {
    const res = client.v1.tweet(tweetMessage);
    return res;
  } catch (err: any) {
    throw err;
  }
}

export async function sendTweetResponse(
  id: string,
  tweetMessage: string
): Promise<{ id_str: string }> {
  try {
    const res = client.v1.reply(tweetMessage, id);
    return res;
  } catch (err: any) {
    throw err;
  }
}
