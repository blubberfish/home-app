import { BabyActivityProfilePayload } from '@blubberfish/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Alert,
  PendingAction,
  activityEntity,
  getInitialState,
  name,
} from './base';

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
    dismissPending(state) {
      state.pending = null;
    },
    confirmPending(state) {
      if (state.pending) {
        state.pending.active = true;
      }
    },
    replaceActivityDataSet(
      state,
      { payload }: PayloadAction<BabyActivityProfilePayload[]>
    ) {
      state.activities = activityEntity.setAll(
        activityEntity.removeAll(state.activities),
        payload
      );
    },
  },
});

export default slice;
export const {
  replaceActivityDataSet,
  setAlert,
  dismissAlert,
  setPending,
  dismissPending,
  confirmPending,
} = slice.actions;
