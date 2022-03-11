import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@blubberfish/types';
import { AppState, IDENTIFIER } from './base';

const getInitialState = (): AppState => ({});

export default createSlice({
  name: IDENTIFIER,
  initialState: getInitialState(),
  reducers: {
    setUser(state, { payload }: PayloadAction<User>) {
      state.currentUser = payload;
    },
  },
});
