import { GlobalState } from '@blubberfish/frontend/modules/core';
import { createSelector } from '@reduxjs/toolkit';
import { DashboardBabyState, name } from './base';

const stateSelector = (state: GlobalState<DashboardBabyState, typeof name>) =>
  state[name];

export const currentBabySelector = createSelector(
  stateSelector,
  (state) => state?.baby
);
