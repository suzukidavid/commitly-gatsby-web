import * as f from "firebase";
import firebase from "gatsby-plugin-firebase";
import { navigate } from "gatsby";
import { toast } from "react-semantic-toasts";
import { useDispatch, useSelector } from "react-redux";

import "firebase/auth";

import { AuthActions } from "../state/actions/auth";
import { GithubDataType, SettiingDataType, TwitterDataType, UserDocType } from "../types/userDoc";

export const TwitterProviderId = "twitter.com";

type GithubCredentialType = {
  credential: { accessToken: string };
  additionalUserInfo: { username: string; isNewUser: boolean; profile: { id: number } };
  user: { uid: string };
};

type TwitterCredentialType = {
  credential: { accessToken: string; secret: string };
  additionalUserInfo: { username: string; isNewUser: boolean; profile: { id_str: string } };
  user: { uid: string };
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, userDoc } = useSelector((state) => state.auth);

  const setUserDoc = async (currentUser: f.User) => {
    const doc = await firebase.firestore().collection("users").doc(currentUser.uid).get();
    dispatch(AuthActions.setUserDoc(doc.data()));
  };

  const setCurrentUser = async () => {
    if (typeof window !== "undefined") {
      dispatch(AuthActions.setLoading(true));
      firebase.auth().onAuthStateChanged(async (currentUser: f.User | null) => {
        dispatch(AuthActions.setUser(currentUser));
        if (currentUser) {
          await setUserDoc(currentUser);
        }
        dispatch(AuthActions.setLoading(false));
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

  const twitterConnect = async () => {
    if (!user || !userDoc) {
      return null;
    }

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
    } as UserDocType;

    if (!userDoc.setting) {
      userData.setting = {} as SettiingDataType;
    }

    if (!userDoc.setting.tweetTime) {
      userData.setting.tweetTime = 21;
    }

    await firebase.firestore().collection("users").doc(uid).set(userData, { merge: true });

    await setCurrentUser();

    toast({
      type: "success",
      title: "Twitter連携が完了しました！",
    });
  };

  const twitterUnconnect = async () => {
    if (!user) {
      return null;
    }

    await user.unlink(TwitterProviderId);

    const userData = {
      twitter: {},
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    } as UserDocType;

    await firebase.firestore().collection("users").doc(user.uid).set(userData, { merge: true });

    await setCurrentUser();

    toast({
      type: "success",
      title: "Twitter連携を解除しました！",
    });
  };

  const changeTweetTime = async (tweetTime: number) => {
    if (!user || !userDoc) {
      return null;
    }

    const userData = {
      setting: { ...userDoc.setting, tweetTime },
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    } as UserDocType;

    await firebase.firestore().collection("users").doc(user.uid).set(userData, { merge: true });
    await setUserDoc(user);

    toast({
      type: "success",
      title: "定期ツイート時刻を設定しました！",
    });
  };

  return { setCurrentUser, login, logout, twitterConnect, twitterUnconnect, changeTweetTime };
};
