import { createSelector } from '@reduxjs/toolkit';
import { IDENTIFIER, LoginState } from './base';

export const loginStateSelector = (state: { [IDENTIFIER]: LoginState }) =>
  state[IDENTIFIER];

export const currentUserSelector = createSelector(
  loginStateSelector,
  (state) => state.user
);
