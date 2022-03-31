import { BabyActivityProfilePayload } from '@blubberfish/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { name, getInitialState, activityEntity } from './base';

const slice = createSlice({
  name,
  initialState: getInitialState(),
  reducers: {
    replaceActivityDataSet(
      state,
      { payload }: PayloadAction<BabyActivityProfilePayload[]>
    ) {
      activityEntity.setAll(state.activities, payload);
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
export const { replaceActivityDataSet, resetBaby, setBaby } = slice.actions;
