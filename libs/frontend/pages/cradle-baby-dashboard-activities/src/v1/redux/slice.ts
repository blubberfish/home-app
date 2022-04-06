import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { name, getInitialState } from './base';

const slice = createSlice({
  name,
  initialState: getInitialState(),
  reducers: {
    setBaby(state, { payload }: PayloadAction<string>) {
      state.baby = payload;
    },
    resetBaby(state) {
      state.baby = null;
    },
  },
});

export default slice;
export const { resetBaby, setBaby } = slice.actions;
