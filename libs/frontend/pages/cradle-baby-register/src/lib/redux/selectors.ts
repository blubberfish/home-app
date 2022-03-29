import { GlobalState } from '@blubberfish/frontend/modules/core';
import { createSelector } from '@reduxjs/toolkit';
import { name, RegisterPageState } from './base';

const stateSelector = (state: GlobalState<RegisterPageState, typeof name>) =>
  state[name];

export const alertSelector = createSelector(
  stateSelector,
  (state) => state?.alert
);

export const successSelector = createSelector(
  stateSelector,
  (state) => state?.successful ?? false
);
