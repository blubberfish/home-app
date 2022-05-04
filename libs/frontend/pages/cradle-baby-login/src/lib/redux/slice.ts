import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { name, getInitialState } from './base';

const slice = createSlice({
  name,
  initialState: getInitialState(),
  reducers: {
    setAlert(
      state,
      { payload }: PayloadAction<{ title: string; message: string } | null>
    ) {
      state.alert = payload ? { ...payload } : null;
    },
  },
});

export default slice;
export const { setAlert } = slice.actions;
