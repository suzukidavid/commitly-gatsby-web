import React from "react";
import * as f from "firebase";
import firebase from "gatsby-plugin-firebase";
import { navigate } from "gatsby";
import { toast } from "react-semantic-toasts";
import { useDispatch } from "react-redux";

import "firebase/auth";

import { AuthActions } from "../state/actions/auth";
import { GithubDataType, UserDocType } from "../types/userDoc";

type GithubCredentialType = {
  credential: { accessToken: string };
  additionalUserInfo: { username: string; isNewUser: boolean; profile: { id: number } };
  user: { uid: string };
};

export const useAuthState = () => {
  const dispatch = useDispatch();

  const getUserDoc = async (uid: string) => {
    const doc = await firebase.firestore().collection("users").doc(uid).get();
    dispatch(AuthActions.setUserDoc(doc.data()));
    dispatch(AuthActions.setLoading(false));
  };

  const setCurrentUser = () => {
    if (typeof window !== "undefined") {
      firebase.auth().onAuthStateChanged((currentUser: f.User | null) => {
        if (currentUser) {
          getUserDoc(currentUser.uid);
        } else {
          dispatch(AuthActions.setLoading(false));
        }
        dispatch(AuthActions.setUser(currentUser));
      });
    }
  };

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
    const userData = { github, updatedAt: timestamp } as UserDocType;
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
    dispatch(AuthActions.setUserDoc(null));
    await navigate("/");
    setTimeout(() => {
      toast({
        type: "success",
        title: "ログアウトしました！",
      });
    }, 500);
  };

  React.useEffect(() => {
    setCurrentUser();
    return;
  }, []);

  return { login, logout };
};
