import { GlobalState } from '@blubberfish/frontend/modules/core';
import { createSelector } from '@reduxjs/toolkit';
import { name, AppState } from './base';

const stateSelector = (state: GlobalState<AppState, typeof name>) =>
  state[name];

export const accountIdSelector = createSelector(
  stateSelector,
  (state) => state?.account
);
