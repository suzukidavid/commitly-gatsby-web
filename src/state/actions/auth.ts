import actionCreatorFactory from "typescript-fsa";
import * as f from "firebase";

import { UserDocType } from "../../types/userDoc";

const actionCreator = actionCreatorFactory("auth");

export const AuthActions = {
  setUser: actionCreator<f.User | null>("setUser"),
  setUserDoc: actionCreator<UserDocType | null>("setUserDoc"),
  setLoading: actionCreator<boolean>("setLoading"),
};
