import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastNotification } from "./types/toast-notification";

export interface CommonState {
  toastNotification: ToastNotification | null;
}

const initialState: CommonState = {
  toastNotification: null,
};

export const selectToastNotification = (state: { common: CommonState }) =>
  state.common.toastNotification;

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toastNotificationShown(state, action: PayloadAction<ToastNotification>) {
      state.toastNotification = action.payload;
    },
    toastNotificationCleared(state) {
      state.toastNotification = null;
    },
  },
});

export const { toastNotificationCleared, toastNotificationShown } =
  commonSlice.actions;

export default commonSlice.reducer;
