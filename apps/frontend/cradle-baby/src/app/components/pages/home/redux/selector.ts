import { createSelector } from '@reduxjs/toolkit';
import { GlobalState } from '@blubberfish/frontend/modules/core';
import { HomePageState, name } from './base';

const stateSelector = (state: GlobalState<HomePageState, typeof name>) =>
  state[name];

export const showMenuSelector = createSelector(
  stateSelector,
  (state) => state?.menu
);
