import { createSelector } from '@reduxjs/toolkit';
import { GlobalState } from '@blubberfish/frontend/modules/core';
import { LoginPageState, name } from './base';

const stateSelector = (state: GlobalState<LoginPageState, typeof name>) =>
  state[name];

export const showMenuSelector = createSelector(
  stateSelector,
  (state) => state?.menu
);
