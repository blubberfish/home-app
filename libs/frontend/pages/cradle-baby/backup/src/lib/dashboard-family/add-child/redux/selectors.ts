import { createSelector } from '@reduxjs/toolkit';
import { GlobalState } from '@blubberfish/frontend/modules/core';
import { name, DashboardFamilyAddChildState } from './base';

const stateSelector = (
  state: GlobalState<DashboardFamilyAddChildState, typeof name>
) => state[name];

export const alertSelector = createSelector(
  stateSelector,
  (state) => state?.alert
);
