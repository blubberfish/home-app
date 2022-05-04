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
      if (payload.search('baby:activity:feed' as BabyActivityType)) {
        state.filter['baby:activity:feed'] =
          !state.filter['baby:activity:feed'];
        state.filter['baby:activity:feed:bottle'] =
          state.filter['baby:activity:feed'];
        state.filter['baby:activity:feed:latch:l'] =
          state.filter['baby:activity:feed'];
        state.filter['baby:activity:feed:latch:r'] =
          state.filter['baby:activity:feed'];
      } else if (payload.search('baby:activity:nurse' as BabyActivityType)) {
        state.filter['baby:activity:nurse'] =
          !state.filter['baby:activity:nurse'];
        state.filter['baby:activity:nurse:defecate'] =
          state.filter['baby:activity:nurse'];
        state.filter['baby:activity:nurse:urinate'] =
          state.filter['baby:activity:nurse'];
      } else {
        state.filter[payload] = !state.filter[payload];
      }
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
