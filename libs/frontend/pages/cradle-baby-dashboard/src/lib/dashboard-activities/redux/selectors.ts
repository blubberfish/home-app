import { GlobalState } from '@blubberfish/frontend/modules/core';
import { createSelector } from '@reduxjs/toolkit';
import { DashboardActivitiesState, name } from './base';

const stateSelector = (
  state: GlobalState<DashboardActivitiesState, typeof name>
) => state[name];

export const currentBabySelector = createSelector(
  stateSelector,
  (state) => state?.baby
);
