import { createSlice } from '@reduxjs/toolkit';

export const loginPageInitialState = {
  loggedIn: false,
};

export type LoginPageState = typeof loginPageInitialState;

export const IDENTIFIER = 'page:login';

const slice = createSlice({
  name: IDENTIFIER,
  initialState: loginPageInitialState,
  reducers: {
    setLoggedIn(state) {
      state.loggedIn = true;
    },
  },
});

export default slice;
export const { setLoggedIn } = slice.actions;
