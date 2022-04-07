import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert, getInitialState, PendingAction, name } from './base';

const slice = createSlice({
  name,
  initialState: getInitialState(),
  reducers: {
    setAlert(state, { payload }: PayloadAction<Alert>) {
      state.alert = payload;
    },
    dismissAlert(state) {
      state.alert = null;
    },
    setPending(state, { payload }: PayloadAction<PendingAction>) {
      state.pending = payload;
    },
    confirmPending(state) {
      if (state.pending) {
        state.pending.active = true;
      }
    },
    dismissPending(state) {
      state.pending = null;
    },
  },
});

export default slice;
export const {
  confirmPending,
  dismissAlert,
  dismissPending,
  setAlert,
  setPending,
} = slice.actions;
