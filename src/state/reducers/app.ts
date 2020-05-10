import { reducerWithInitialState } from "typescript-fsa-reducers";

export interface AppState {
  loading: boolean;
}

export const initialState = {
  loading: true,
};

export const appReducer = reducerWithInitialState(initialState);
