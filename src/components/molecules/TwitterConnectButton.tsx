import React from "react";
import firebase from "gatsby-plugin-firebase";
import * as f from "firebase";
import { Button, Icon } from "semantic-ui-react";

import { TwitterDataType, UserDataType, useAuthState } from "../../hooks/useAuthState";

export const TwitterProviderId = "twitter.com";

type TwitterCredentialType = {
  credential: { accessToken: string; secret: string };
  additionalUserInfo: { username: string; isNewUser: boolean; profile: { id_str: string } };
  user: { uid: string };
};

const handleOnLogin = async (user: f.User, userDoc: UserDataType) => {
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
  const userData = {
    twitter,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  } as UserDataType;

  if (!userDoc.setting.tweetTime) {
    userData.setting.tweetTime = 21;
  }

  await firebase.firestore().collection("users").doc(uid).set(userData, { merge: true });
};

export const TwitterConnectButton: React.FC = () => {
  const { user, userDoc } = useAuthState();
  if (!user || !userDoc) {
    return null;
  }
  const twitterUserData = user.providerData.find((d) => d && d.providerId === TwitterProviderId);
  return (
    <Button color="twitter" size="big" onClick={() => handleOnLogin(user, userDoc)} disabled={!!twitterUserData}>
      <Icon name="twitter" />
      {twitterUserData ? "Twitter連携中" : "Twitter連携"}
    </Button>
  );
};
