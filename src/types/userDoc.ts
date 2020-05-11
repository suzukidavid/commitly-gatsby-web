import * as f from "firebase";

export type UserDocType = {
  github: GithubDataType;
  twitter: TwitterDataType;
  setting: SettiingDataType;
  createdAt?: f.firestore.FieldValue;
  updatedAt: f.firestore.FieldValue;
};

export type GithubDataType = {
  username: string;
  userId: string;
  accessToken: string;
};

export type TwitterDataType = {
  username: string;
  userId: string;
  accessToken: string;
  secret: string;
};

export type SettiingDataType = { tweetTime: number };
