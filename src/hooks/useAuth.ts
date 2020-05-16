import * as f from "firebase";
import firebase from "gatsby-plugin-firebase";
import { navigate } from "gatsby";
import { toast } from "react-semantic-toasts";
import { useDispatch, useSelector } from "react-redux";

import "firebase/auth";

import { AuthActions } from "../state/actions/auth";
import { User } from "../models/User";

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

  const getUserDoc = async (uid: string) => {
    const doc = await firebase.firestore().collection("users").doc(uid).get();
    return new User(doc.data());
  };

  const reloadUserDoc = async (uid: string) => {
    const userDoc = await getUserDoc(uid);
    dispatch(AuthActions.setUserDoc(userDoc));
  };

  const updateFirestoreUserDoc = async (uid: string, userDoc: User) => {
    await firebase.firestore().collection("users").doc(uid).set(userDoc.getFirestoreObject(), { merge: true });
  };

  const setCurrentUser = async () => {
    if (typeof window !== "undefined") {
      dispatch(AuthActions.setLoading(true));
      firebase.auth().onAuthStateChanged(async (currentUser: f.User | null) => {
        dispatch(AuthActions.setUser(currentUser));
        if (currentUser) {
          await reloadUserDoc(currentUser.uid);
        }
        dispatch(AuthActions.setLoading(false));
      });
    }
  };

  const login = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope("read:user");

    const userCredential: unknown = await firebase.auth().signInWithPopup(provider);

    // フルスクリーンの場合はポップアップで新規タブを開いてネットワークがオフラインになるため必要
    await firebase.firestore().enableNetwork();

    const {
      credential: { accessToken },
      additionalUserInfo: {
        username,
        profile: { id },
      },
      user: { uid },
    } = userCredential as GithubCredentialType;

    const userDoc = await getUserDoc(uid);
    const nextUserDoc = userDoc.setGithub({ username, userId: String(id), accessToken });
    await updateFirestoreUserDoc(uid, nextUserDoc);
    await setCurrentUser();

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

    dispatch(AuthActions.setUser(null));
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

    const nextUserDoc = userDoc.setTwitter({ username, userId, accessToken, secret });
    await updateFirestoreUserDoc(uid, nextUserDoc);
    await setCurrentUser();

    toast({
      type: "success",
      title: "Twitter連携が完了しました！",
    });
  };

  const twitterUnconnect = async () => {
    if (!user || !userDoc) {
      return null;
    }

    await user.unlink(TwitterProviderId);

    const nextUserDoc = userDoc.clearTwitter();
    await updateFirestoreUserDoc(user.uid, nextUserDoc);
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

    const nextDoc = userDoc.setSettingTweetTime(tweetTime);
    await updateFirestoreUserDoc(user.uid, nextDoc);
    await reloadUserDoc(user.uid);

    toast({
      type: "success",
      title: "定期ツイート時刻を設定しました！",
    });
  };

  return { setCurrentUser, login, logout, twitterConnect, twitterUnconnect, changeTweetTime };
};
