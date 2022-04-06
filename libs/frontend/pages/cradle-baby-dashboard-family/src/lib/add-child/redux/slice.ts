import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { name, getInitialState, PendingAction } from './base';

const slice = createSlice({
  name,
  initialState: getInitialState(),
  reducers: {
    setPending(state, { payload }: PayloadAction<PendingAction>) {
      state.pending = payload;
    },
    resetPending(state) {
      state.pending = null;
    },
    startAction(state) {
      if (state.pending) {
        state.pending.started = true;
      }
    },
  },
});

export default slice;
export const { setPending, startAction, resetPending } = slice.actions;
