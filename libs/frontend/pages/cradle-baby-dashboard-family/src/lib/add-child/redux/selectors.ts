import { GlobalState } from '@blubberfish/frontend/modules/core';
import { createSelector } from '@reduxjs/toolkit';
import { name, FamilyAddChildState } from './base';

const stateSelector = (state: GlobalState<FamilyAddChildState, typeof name>) =>
  state[name];

export const pendingActionSelector = createSelector(
  stateSelector,
  (state) => state?.pending
);
