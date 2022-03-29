import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { name, getInitialState, storage } from './base';

const slice = createSlice({
  name,
  initialState: getInitialState(),
  reducers: {
    setAccountId(state, { payload }: PayloadAction<string | null>) {
      storage.accountId.set(payload);
      state.account = payload;
    },
  },
});

export default slice;
export const { setAccountId } = slice.actions;
