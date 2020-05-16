import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as f from "firebase";
import { produce } from "immer";

import { AuthActions } from "../actions/auth";
import { User } from "../../models/User";

export interface AuthState {
  user: f.User | null;
  userDoc: User | null;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  userDoc: null,
  loading: true,
};

export const authReducer = reducerWithInitialState(initialState)
  .case(AuthActions.setUser, (state, payload) => {
    return produce(state, (draftState) => {
      draftState.user = payload;
    });
  })
  .case(AuthActions.setUserDoc, (state, payload) => {
    return produce(state, (draftState) => {
      draftState.userDoc = payload;
    });
  })
  .case(AuthActions.setLoading, (state, payload) => {
    return produce(state, (draftState) => {
      draftState.loading = payload;
    });
  });
