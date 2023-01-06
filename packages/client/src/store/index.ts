import { actions, store } from "./configureStore";

export {
  store,
  actions
}

export type AppDispatch = typeof store.dispatch;

export interface ActionCallback {
  (response?: Response): void;
}
