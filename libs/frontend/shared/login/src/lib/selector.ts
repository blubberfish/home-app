import { createSelector } from '@reduxjs/toolkit';
import { IDENTIFIER, LoginState } from './base';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginStateSelector = (state: any): LoginState | undefined =>
  state[IDENTIFIER];

export const loginPendingSelector = createSelector(
  loginStateSelector,
  (state) =>
    state?.api &&
    state.api.pending !== state.api.fulfilled &&
    state.api.pending !== state.api.rejected
);

export const loggedInUserSelector = createSelector(
  loginStateSelector,
  (state) => state?.currentUser
);

export const loginErrorSelector = createSelector(
  loginStateSelector,
  (state) => state?.errorMessage
);
