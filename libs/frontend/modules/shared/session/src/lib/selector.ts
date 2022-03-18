import { GlobalState } from '@blubberfish/frontend/modules/core';
import { createSelector } from '@reduxjs/toolkit';
import { IDENTIFIER, SessionState } from './base';

export const sessionStateSelector = (
  state: GlobalState<SessionState, typeof IDENTIFIER>
) => state[IDENTIFIER];

export const currentUserSelector = createSelector(
  sessionStateSelector,
  (state) => state.user
);
