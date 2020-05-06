import React from "react";
import * as f from "firebase";
import firebase from "gatsby-plugin-firebase";
import "firebase/auth";

type GithubCredentialType = {
  credential: { accessToken: string };
  additionalUserInfo: { username: string; isNewUser: boolean; profile: { id: number } };
  user: { uid: string };
};

type UserDataType = {
  github: GithubDataType;
  createdAt?: f.firestore.FieldValue;
  updatedAt: f.firestore.FieldValue;
};

type GithubDataType = {
  username: string;
  userId: string;
  accessToken: string;
};

export const useAuthState = () => {
  const [user, setUser] = React.useState<null | f.User>(null);

  const setCurrentUser = () => {
    if (typeof window !== "undefined") {
      firebase.auth().onAuthStateChanged((currentUser) => setUser(currentUser));
    }
  };

  const login = async () => {
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
    setCurrentUser();
  };

  const logout = async () => {
    await firebase.auth().signOut();
    setCurrentUser();
  };

  React.useEffect(() => {
    setCurrentUser();
    return;
  }, []);
  return { user, login, logout };
};
