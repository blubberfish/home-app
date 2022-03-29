import { GlobalState } from '@blubberfish/frontend/modules/core';
import { createSelector } from '@reduxjs/toolkit';
import { name, LoginPageState } from './base';

const stateSelector = (state: GlobalState<LoginPageState, typeof name>) =>
  state[name];

export const alertSelector = createSelector(
  stateSelector,
  (state) => state?.alert
);
