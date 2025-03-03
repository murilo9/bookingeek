import { configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
// Or from '@reduxjs/toolkit/query/react'
import {
  createApi,
  fetchBaseQuery,
  setupListeners,
} from "@reduxjs/toolkit/query/react";
import { useDispatch, useSelector } from "react-redux";
import commonReducer from "./common-slice";
import { BASE_URL_DEV } from "../env";

export const appApi = createApi({
  tagTypes: ["Resource", "Post", "Reservation"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_DEV,
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token");
      // If we have a token set in state, let's assume that we should be passing it.
      if (accessToken) {
        headers.set("authorization", accessToken);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const store = configureStore({
  reducer: {
    common: commonReducer,
    // Add the generated reducer as a specific top-level slice
    [appApi.reducerPath]: appApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([appApi.middleware]),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
