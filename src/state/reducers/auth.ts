import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as f from "firebase";

import { AuthActions } from "../actions/auth";
import { UserDocType } from "../../types/userDoc";

export interface AuthState {
  user: f.User | null;
  userDoc: UserDocType | null;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  userDoc: null,
  loading: true,
};

export const authReducer = reducerWithInitialState(initialState)
  .case(AuthActions.setUser, (state, payload) => {
    return { ...state, user: payload };
  })
  .case(AuthActions.setUserDoc, (state, payload) => {
    return { ...state, userDoc: payload };
  })
  .case(AuthActions.setLoading, (state, payload) => {
    return { ...state, loading: payload };
  });
