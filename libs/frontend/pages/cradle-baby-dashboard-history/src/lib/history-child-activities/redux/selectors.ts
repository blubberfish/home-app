import { GlobalState } from '@blubberfish/frontend/modules/core';
import { createSelector } from '@reduxjs/toolkit';
import {
  activityEntity,
  DashboardActivitiesState,
  defaultFilter,
  Filter,
  name,
} from './base';

const stateSelector = (
  state: GlobalState<DashboardActivitiesState, typeof name>
) => state[name];

const activityEntityStateSelector = createSelector(
  stateSelector,
  (state) => state?.activities ?? activityEntity.getInitialState()
);

export const { selectAll: activitySelector } = activityEntity.getSelectors(
  activityEntityStateSelector
);

export const filterSelector = createSelector(
  stateSelector,
  (state): Filter => state?.filter ?? defaultFilter
);
