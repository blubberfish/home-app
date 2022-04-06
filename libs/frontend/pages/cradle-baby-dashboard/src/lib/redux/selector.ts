import { GlobalState } from '@blubberfish/frontend/modules/core';
import { createSelector } from '@reduxjs/toolkit';
import { DashboardPageState, name } from './base';

const stateSelector = (state: GlobalState<DashboardPageState, typeof name>) =>
  state[name];

export const isMenuOpenSelector = createSelector(
  stateSelector,
  (state) => state?.menu ?? false
);

export const navListSelector = createSelector(
  stateSelector,
  (state) => state?.navItems ?? []
);
