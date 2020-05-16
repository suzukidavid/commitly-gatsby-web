import firebase from "gatsby-plugin-firebase";
import dayjs, { Dayjs } from "dayjs";
import { immerable, produce } from "immer";

class Github {
  [immerable] = true;

  userId: string;
  username: string;
  accessToken: string;

  constructor(data) {
    const { ...params } = data;
    const { userId, username, accessToken } = params;
    this.userId = userId;
    this.username = username;
    this.accessToken = accessToken;
  }

  getFirestoreObject() {
    const { userId, username, accessToken } = this;
    return { userId, username, accessToken };
  }
}

class Twitter {
  [immerable] = true;

  userId: string;
  username: string;
  accessToken: string;
  secret: string;

  constructor(data) {
    const { ...params } = data;
    const { userId, username, accessToken, secret } = params;
    this.userId = userId;
    this.username = username;
    this.accessToken = accessToken;
    this.secret = secret;
  }

  getFirestoreObject() {
    const { userId, username, accessToken, secret } = this;
    return { userId, username, accessToken, secret };
  }
}

class Setting {
  tweetTime: number;

  constructor(data) {
    const { ...params } = data;
    const { tweetTime } = params;
    this.tweetTime = tweetTime;
  }

  getFirestoreObject() {
    const { tweetTime } = this;
    return { tweetTime };
  }
}

export class User {
  [immerable] = true;

  github: Github;
  twitter: Twitter;
  setting: Setting;
  updatedAt: Dayjs | null;
  createdAt: Dayjs | null;

  constructor(data) {
    const { ...params } = data;
    console.log(params);
    const { github, twitter, setting, updatedAt, createdAt } = params;
    this.github = new Github(github);
    this.twitter = new Twitter(twitter);
    this.setting = new Setting(setting);
    this.updatedAt = updatedAt ? dayjs(updatedAt.toDate()) : null;
    this.createdAt = createdAt ? dayjs(createdAt.toDate()) : null;
  }

  getFirestoreObject() {
    const { github, twitter, setting } = this;
    const createdAt = this.createdAt ? this.createdAt.toDate() : firebase.firestore.FieldValue.serverTimestamp();
    return {
      github: github.getFirestoreObject(),
      twitter: twitter.getFirestoreObject(),
      setting: setting.getFirestoreObject(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdAt,
    };
  }

  changeSettingTweetTime(tweetTime: number) {
    return produce(this, (draftState) => {
      draftState.setting.tweetTime = tweetTime;
    });
  }
}
