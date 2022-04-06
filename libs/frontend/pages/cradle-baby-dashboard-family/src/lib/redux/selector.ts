import { GlobalState } from '@blubberfish/frontend/modules/core';
import { createSelector } from '@reduxjs/toolkit';
import { childEntity, name, OverviewState } from './base';

const stateSelector = (state: GlobalState<OverviewState, typeof name>) =>
  state[name];

const childEntitiesStateSelector = createSelector(
  stateSelector,
  (state) => state?.children ?? childEntity.getInitialState()
);

const childEntitySelectors = childEntity.getSelectors(
  childEntitiesStateSelector
);
