import React from "react";
import firebase from "gatsby-plugin-firebase";
import { Button, Icon } from "semantic-ui-react";

type GithubCredentialType = {
  credential: { accessToken: string };
  additionalUserInfo: { username: string; isNewUser: boolean; profile: { id: number } };
  user: { uid: string };
};

type GithubDataType = {
  username: string;
  user_id: string;
  access_token: string;
  created_at?: firebase.firestore.FieldValue;
  updated_at: firebase.firestore.FieldValue;
};

const handleOnLogin = async () => {
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope("read:user");
  provider.setCustomParameters({ allow_signup: true });

  const userCredential: unknown = await firebase.auth().signInWithPopup(provider);
  console.log(userCredential);
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
  const github: GithubDataType = { username, user_id: String(id), access_token: accessToken, updated_at: timestamp };
  if (isNewUser) {
    github.created_at = timestamp;
  }
  const userData = { github };
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
