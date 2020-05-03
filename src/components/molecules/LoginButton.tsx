import React from "react";
import firebase from "gatsby-plugin-firebase";
import { Button, Icon } from "semantic-ui-react";

type GithubCredentialType = {
  credential: { accessToken: string };
  additionalUserInfo: { username: string; isNewUser: boolean; profile: { id: number } };
  user: { uid: string };
};

type UserDataType = {
  github: GithubDataType;
};

type GithubDataType = {
  username: string;
  userId: string;
  accessToken: string;
  createdAt?: firebase.firestore.FieldValue;
  updatedAt: firebase.firestore.FieldValue;
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
  const github: GithubDataType = { username, userId: String(id), accessToken: accessToken, updatedAt: timestamp };
  if (isNewUser) {
    github.createdAt = timestamp;
  }
  const userData: UserDataType = { github };
  await firebase.firestore().collection("users").doc(uid).set(userData, { merge: true });
};

export const LoginButton: React.FC = () => {
  return (
    <Button color="black" onClick={() => handleOnLogin()}>
      <Icon name="github" />
      ログイン
    </Button>
  );
};
