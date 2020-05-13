import { createStore } from "redux";

import { State, rootReducer } from "./reducers";

export default (preloadedState: State) => {
  return createStore(rootReducer(), preloadedState);
};
