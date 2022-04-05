import { BabyActivityProfilePayload } from '@blubberfish/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { name, getInitialState, activityEntity } from './base';

const slice = createSlice({
  name,
  initialState: getInitialState(),
  reducers: {
    clearDataSet(
      state,
      { payload }: PayloadAction<BabyActivityProfilePayload[]>
    ) {
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
    setLoading(state) {
      state.dataSetLoading = true;
    },
    unsetLoading(state) {
      state.dataSetLoading = false;
    },
  },
});

export default slice;
export const {
  clearDataSet,
  replaceActivityDataSet,
  resetBaby,
  setBaby,
  setLoading,
  unsetLoading,
} = slice.actions;
