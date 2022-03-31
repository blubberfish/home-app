import { GlobalState } from '@blubberfish/frontend/modules/core';
import { createSelector } from '@reduxjs/toolkit';
import { activityEntity, DashboardActivitiesState, name } from './base';

const stateSelector = (
  state: GlobalState<DashboardActivitiesState, typeof name>
) => state[name];

export const currentBabySelector = createSelector(
  stateSelector,
  (state) => state?.baby
);

const activityEntityStateSelector = createSelector(
  stateSelector,
  (state) => state?.activities ?? activityEntity.getInitialState()
);

export const { selectAll: activitySelector } = activityEntity.getSelectors(
  activityEntityStateSelector
);
