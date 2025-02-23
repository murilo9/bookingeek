import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastNotification } from "./types/toast-notification";
import { GenericDialogData } from "./types/generic-dialog-data";

export interface CommonState {
  toastNotification: ToastNotification | null;
  genericDialogData: GenericDialogData | null;
}

const initialState: CommonState = {
  toastNotification: null,
  genericDialogData: null,
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
    genericDialogShown(state, action: PayloadAction<GenericDialogData>) {
      state.genericDialogData = action.payload;
    },
    genericDialogClosed(state) {
      state.genericDialogData = null;
    },
  },
});

export const {
  toastNotificationCleared,
  toastNotificationShown,
  genericDialogClosed,
  genericDialogShown,
} = commonSlice.actions;

export default commonSlice.reducer;
