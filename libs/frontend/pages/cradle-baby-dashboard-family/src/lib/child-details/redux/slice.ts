import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert, name, getInitialState, PendingAction } from './base';

const slice = createSlice({
  name,
  initialState: getInitialState(),
  reducers: {
    setPending(state, { payload }: PayloadAction<PendingAction>) {
      state.pending = payload;
    },
    dismissPending(state) {
      state.pending = null;
    },
    confirmPending(state) {
      if (state.pending) {
        state.pending.started = true;
      }
    },
    dismissAlert(state) {
      state.alert = null;
    },
    setAlert(state, { payload }: PayloadAction<Alert>) {
      state.alert = payload;
    },
  },
});

export default slice;
export const {
  setPending,
  confirmPending,
  dismissPending,
  dismissAlert,
  setAlert,
} = slice.actions;
