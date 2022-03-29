import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountInfo } from '@blubberfish/types';
import { name, getInitialState, storage } from './base';

const slice = createSlice({
  name,
  initialState: getInitialState(),
  reducers: {
    setAccountId(state, { payload }: PayloadAction<string | null>) {
      storage.accountId.set(payload);
      state.account = payload;
    },
    setAccountInfo(state, { payload }: PayloadAction<AccountInfo | null>) {
      state.accountInfo = payload;
    },
  },
});

export default slice;
export const { setAccountId, setAccountInfo } = slice.actions;
