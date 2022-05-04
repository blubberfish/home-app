import { GlobalState } from '@blubberfish/frontend/modules/core';
import { createSelector } from '@reduxjs/toolkit';
import { name, ActivitiesLogState } from './base';

const stateSelector = (state: GlobalState<ActivitiesLogState, typeof name>) =>
  state[name];

export const alertSelector = createSelector(
  stateSelector,
  (state) => state?.alert
);

export const pendingSelector = createSelector(
  stateSelector,
  (state) => state?.pending
);
