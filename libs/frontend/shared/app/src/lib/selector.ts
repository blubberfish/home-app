import { createSelector } from '@reduxjs/toolkit';
import { IDENTIFIER, AppState } from './base';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appStateSelector = (state: any): AppState | undefined =>
  state[IDENTIFIER];

export const loggedInUserSelector = createSelector(
  appStateSelector,
  (state) => state?.currentUser
);
