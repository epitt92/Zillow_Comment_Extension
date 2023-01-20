import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
}
const store = makeStore();

export default store;
