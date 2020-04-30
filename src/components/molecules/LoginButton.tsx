import React from "react";
import firebase from "gatsby-plugin-firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Icon } from "semantic-ui-react";

type GithubCredentialType = {
  credential: { accessToken: string };
  additionalUserInfo: { username: string; isNewUser: boolean; profile: { id: number } };
};

type GithubDataType = {
  username: string;
  user_id: string;
  access_token: string;
  created_at: firebase.firestore.FieldValue;
  updated_at: firebase.firestore.FieldValue;
};

const handleOnLogin = async (user: firebase.User) => {
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
  } = userCredential as GithubCredentialType;
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const github = { username, user_id: String(id), access_token: accessToken, updated_at: timestamp } as GithubDataType;
  if (isNewUser) {
    github.created_at = timestamp;
  }
  const userData = { github };
  await firebase.firestore().collection("users").doc(user.uid).set(userData, { merge: true });
};

export const LoginButton: React.FC = () => {
  const [user, initialising, error] = useAuthState(firebase.auth());
  if (!user) {
    return null;
  }
  return (
    <Button color="black" onClick={() => handleOnLogin(user)}>
      <Icon name="github" />
      ログイン
    </Button>
  );
};
