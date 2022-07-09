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

export default async function sendTweet(tweetMessage: string) {
  client.v1.tweet(tweetMessage).catch(console.error);
}

export async function sendTweetResponse(id: string, tweetMessage: string) {
  client.v1.reply(tweetMessage, id).catch(console.error);
}
