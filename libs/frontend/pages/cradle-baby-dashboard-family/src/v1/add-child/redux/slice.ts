import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getInitialState, name } from './base';

const slice = createSlice({
  name,
  initialState: getInitialState(),
  reducers: {
    setAlert(
      state,
      { payload }: PayloadAction<{ title: string; message: string } | null>
    ) {
      state.alert = payload;
    },
  },
});

export default slice;
export const { setAlert } = slice.actions;
