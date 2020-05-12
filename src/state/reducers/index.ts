import { combineReducers } from "redux";

import { AuthState, authReducer } from "./auth";

export interface State {
  auth: AuthState;
}

export const rootReducer = () =>
  combineReducers({
    auth: authReducer,
  });
