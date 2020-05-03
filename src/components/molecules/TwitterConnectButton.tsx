import React from "react";
import firebase from "gatsby-plugin-firebase";
import { Button, Icon } from "semantic-ui-react";

import { useAuthState } from "../../hooks/useAuthState";

const TwitterProviderId = "twitter.com";

type TwitterCredentialType = {
  credential: { accessToken: string; secret: string };
  additionalUserInfo: { username: string; isNewUser: boolean; profile: { id_str: string } };
  user: { uid: string };
};

type UserDataType = {
  twitter: TwitterDataType;
  setting: { tweetTime: number };
  updatedAt: firebase.firestore.FieldValue;
};

type TwitterDataType = {
  username: string;
  userId: string;
  accessToken: string;
  secret: string;
};

const handleOnLogin = async (user: firebase.User) => {
  const provider = new firebase.auth.TwitterAuthProvider();
  provider.setCustomParameters({ force_login: true });

  const userCredential: unknown = await user.linkWithPopup(provider);

  const {
    credential: { accessToken, secret },
    additionalUserInfo: {
      username,
      profile: { id_str: userId },
    },
    user: { uid },
  } = userCredential as TwitterCredentialType;
  const twitter: TwitterDataType = { username, userId, accessToken, secret };
  const userData: UserDataType = {
    twitter,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    setting: { tweetTime: 19 },
  };
  await firebase.firestore().collection("users").doc(uid).set(userData, { merge: true });
};

export const TwitterConnectButton: React.FC = () => {
  const user = useAuthState();
  if (!user) {
    return null;
  }
  const twitterUserData = user.providerData.find((d) => d.providerId === TwitterProviderId);
  return (
    <Button color="twitter" onClick={() => handleOnLogin(user)}>
      <Icon name="twitter" />
      {twitterUserData ? "ログイン中" : "ログイン"}
    </Button>
  );
};
