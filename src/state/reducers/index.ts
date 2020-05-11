import { combineReducers } from "redux";

import { AppState, appReducer } from "./app";
import { AuthState, authReducer } from "./auth";

export interface State {
  app: AppState;
  auth: AuthState;
}

export const rootReducer = () =>
  combineReducers({
    app: appReducer,
    auth: authReducer,
  });
