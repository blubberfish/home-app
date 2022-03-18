import { CurrentUser } from '@blubberfish/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDENTIFIER, getInitialState } from './base';

const slice = createSlice({
  initialState: getInitialState(),
  name: IDENTIFIER,
  reducers: {
    unsetCurrentUser(state) {
      state.user = null;
    },
    setCurrentUser(state, { payload }: PayloadAction<CurrentUser>) {
      state.user = payload;
    },
  },
});

export default slice;

export const {
  actions: { setCurrentUser, unsetCurrentUser },
} = slice;
