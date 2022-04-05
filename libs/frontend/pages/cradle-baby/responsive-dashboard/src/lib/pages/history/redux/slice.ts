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
    unsetPending(state) {
      state.pending = null;
    },
    clearDataSet(state) {
      state.activities = activityEntity.removeAll(state.activities);
    },
    replaceActivityDataSet(
      state,
      { payload }: PayloadAction<BabyActivityProfilePayload[]>
    ) {
      state.activities = activityEntity.setAll(state.activities, payload);
    },
    setBaby(state, { payload }: PayloadAction<string>) {
      state.baby = payload;
    },
    resetBaby(state) {
      state.baby = null;
    },
  },
});

export default slice;
export const {
  clearDataSet,
  replaceActivityDataSet,
  resetBaby,
  setBaby,
  setAlert,
  dismissAlert,
  setPending,
  unsetPending,
} = slice.actions;
