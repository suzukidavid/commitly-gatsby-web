import { combineReducers } from "redux";

import { AppState, appReducer } from "./app";

export interface State {
  app: AppState;
}

export const rootReducer = () =>
  combineReducers({
    app: appReducer,
  });
