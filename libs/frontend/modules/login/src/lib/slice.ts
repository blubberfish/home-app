import { CurrentUser } from '@blubberfish/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDENTIFIER, LoginState } from './base';

const getInitialState = (): LoginState => ({});

const slice = createSlice({
  initialState: getInitialState(),
  name: IDENTIFIER,
  reducers: {
    setUser(state, { payload }: PayloadAction<CurrentUser>) {
      state.user = payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export default slice;
export const { clearUser, setUser } = slice.actions;
