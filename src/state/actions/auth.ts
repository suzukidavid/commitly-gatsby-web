import actionCreatorFactory from "typescript-fsa";
import * as f from "firebase";

import { User } from "../../models/User";

const actionCreator = actionCreatorFactory("auth");

export const AuthActions = {
  setUser: actionCreator<f.User | null>("setUser"),
  setUserDoc: actionCreator<User | null>("setUserDoc"),
  setLoading: actionCreator<boolean>("setLoading"),
};
