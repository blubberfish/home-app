import { CurrentUser } from '@blubberfish/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDENTIFIER, getInitialState } from './base';

export default createSlice({
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
