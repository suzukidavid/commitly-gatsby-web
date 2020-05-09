import React from "react";
import * as f from "firebase";
import firebase from "gatsby-plugin-firebase";
import { navigate } from "gatsby";
import { toast } from "react-semantic-toasts";

import "firebase/auth";

type GithubCredentialType = {
  credential: { accessToken: string };
  additionalUserInfo: { username: string; isNewUser: boolean; profile: { id: number } };
  user: { uid: string };
};

export type UserDataType = {
  github: GithubDataType;
  twitter: TwitterDataType;
  setting: SettiingDataType;
  createdAt?: f.firestore.FieldValue;
  updatedAt: f.firestore.FieldValue;
};

type GithubDataType = {
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

export const useAuthState = () => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<null | f.User>(null);
  const [userDoc, setUserDoc] = React.useState<null | UserDataType>(null);

  const login = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope("read:user");

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
    const github: GithubDataType = { username, userId: String(id), accessToken };
    const userData = { github, updatedAt: timestamp } as UserDataType;
    if (isNewUser) {
      userData.createdAt = timestamp;
    }
    await firebase.firestore().collection("users").doc(uid).set(userData, { merge: true });
    await navigate("/setting");
    setTimeout(() => {
      toast({
        type: "success",
        title: "ログインしました！",
      });
    }, 500);
  };

  const logout = async () => {
    await firebase.auth().signOut();
    await navigate("/");
    setTimeout(() => {
      toast({
        type: "success",
        title: "ログアウトしました！",
      });
    }, 500);
  };

  React.useEffect(() => {
    let mounted = true;

    const getUserDoc = async (uid: string) => {
      const doc = await firebase.firestore().collection("users").doc(uid).get();
      if (mounted) {
        setUserDoc(doc.data());
        setLoading(false);
      }
    };

    const setCurrentUser = () => {
      if (typeof window !== "undefined") {
        firebase.auth().onAuthStateChanged((currentUser: f.User | null) => {
          if (mounted) {
            if (currentUser) {
              getUserDoc(currentUser.uid);
            } else {
              setLoading(false);
            }
            setUser(currentUser);
          }
        });
      }
    };

    setCurrentUser();
    return () => {
      mounted = false;
    };
  }, []);

  return { user, userDoc, loading, login, logout };
};
