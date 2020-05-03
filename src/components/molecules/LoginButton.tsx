import React from "react";
import firebase from "gatsby-plugin-firebase";
import { Button, Icon } from "semantic-ui-react";

import { useAuthState } from "../../hooks/useAuthState";

type GithubCredentialType = {
  credential: { accessToken: string };
  additionalUserInfo: { username: string; isNewUser: boolean; profile: { id: number } };
  user: { uid: string };
};

type UserDataType = {
  github: GithubDataType;
  createdAt?: firebase.firestore.FieldValue;
  updatedAt: firebase.firestore.FieldValue;
};

type GithubDataType = {
  username: string;
  userId: string;
  accessToken: string;
};

const handleOnLogin = async () => {
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope("read:user");
  provider.setCustomParameters({ allow_signup: true });

  const userCredential: unknown = await firebase.auth().signInWithPopup(provider);
  const {
    credential: { accessToken },
    additionalUserInfo: {
      username,
      isNewUser,
      profile: { id },
    },
    user: { uid },
  } = userCredential as GithubCredentialType;
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const github: GithubDataType = { username, userId: String(id), accessToken: accessToken };
  const userData: UserDataType = { github, updatedAt: timestamp };
  if (isNewUser) {
    userData.createdAt = timestamp;
  }
  await firebase.firestore().collection("users").doc(uid).set(userData, { merge: true });
};

export const LoginButton: React.FC = () => {
  const user = useAuthState();
  return (
    <Button color="black" onClick={() => handleOnLogin()}>
      <Icon name="github" />
      {user ? "ログイン中" : "ログイン"}
    </Button>
  );
};
