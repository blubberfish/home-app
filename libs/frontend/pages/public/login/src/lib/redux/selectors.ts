import { createSelector } from '@reduxjs/toolkit';
import { IDENTIFIER, LoginPageState } from './slice';

const loginPageStateSelector = (state: { [IDENTIFIER]?: LoginPageState }) =>
  state[IDENTIFIER];

export const isUserLoggedInSelector = createSelector(
  loginPageStateSelector,
  (state) => state?.loggedIn
);
