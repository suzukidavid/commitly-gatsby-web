import actionCreatorFactory from "typescript-fsa";
import firebase from "gatsby-plugin-firebase";

import { User } from "../../models/User";

const actionCreator = actionCreatorFactory("auth");

export const AuthActions = {
  setUser: actionCreator<firebase.User | null>("setUser"),
  setUserDoc: actionCreator<User | null>("setUserDoc"),
  setLoading: actionCreator<boolean>("setLoading"),
};
