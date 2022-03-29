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
    wasSuccessful(state) {
      state.successful = true;
    },
  },
});

export default slice;
export const { setAlert, wasSuccessful } = slice.actions;
