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
    const userData: UserDataType = { github, updatedAt: timestamp };
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
    const setCurrentUser = () => {
      if (typeof window !== "undefined") {
        firebase.auth().onAuthStateChanged((currentUser) => {
          if (mounted) {
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

  return { user, login, logout };
};
