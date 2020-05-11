import React from "react";
import firebase from "gatsby-plugin-firebase";
import * as f from "firebase";
import { Button, Icon } from "semantic-ui-react";
import { toast } from "react-semantic-toasts";
import { useSelector } from "react-redux";

import { UserDocType } from "../../types/userDoc";

import { TwitterProviderId } from "./TwitterConnectButton";

const handleOnUnlink = async (user: f.User) => {
  await user.unlink(TwitterProviderId);

  const userData = {
    twitter: {},
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  } as UserDocType;

  await firebase.firestore().collection("users").doc(user.uid).set(userData, { merge: true });

  toast({
    type: "success",
    title: "Twitter連携を解除しました！",
  });
};

export const TwitterUnConnectButton: React.FC = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return null;
  }
  const twitterUserData = user.providerData.find((d) => d && d.providerId === TwitterProviderId);
  if (!twitterUserData) {
    return null;
  }
  return (
    <Button color="red" size="big" onClick={() => handleOnUnlink(user)}>
      <Icon name="twitter" />
      Twitter連携解除
    </Button>
  );
};
