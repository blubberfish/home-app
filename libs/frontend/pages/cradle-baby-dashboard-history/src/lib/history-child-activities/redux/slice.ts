import {
  BabyActivityProfilePayload,
  BabyActivityType,
} from '@blubberfish/types';
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
    toggleFilter(state, { payload }: PayloadAction<BabyActivityType>) {
      state.filter[payload] = !state.filter[payload];
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
  toggleFilter,
} = slice.actions;
