import { GlobalState } from '@blubberfish/frontend/modules/core';
import { BabyActivityProfilePayload } from '@blubberfish/types';
import { createSelector } from '@reduxjs/toolkit';
import moment from 'moment';
import { activityEntity, DashboardActivitiesState, name } from './base';

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

export type TimeNormalizedActivity = {
  [hours: number]: BabyActivityProfilePayload[];
};

export type DateNormalizedData<T> = {
  [year: number]: {
    [month: number]: {
      [date: number]: T;
    };
  };
};

export const normalizedDataSelector = createSelector(
  activitySelector,
  (activities) =>
    activities.reduce<DateNormalizedData<TimeNormalizedActivity>>(
      (seed, element) => {
        const time = moment(element.timestamp);
        seed[time.year()] = seed[time.year()] ?? {};
        seed[time.year()][time.month()] = seed[time.year()][time.month()] ?? {};
        seed[time.year()][time.month()][time.date()] =
          seed[time.year()][time.month()][time.date()] ?? {};
        seed[time.year()][time.month()][time.date()][time.hour()] =
          seed[time.year()][time.month()][time.date()][time.hour()] ?? [];
        seed[time.year()][time.month()][time.date()][time.hour()].push(element);
        return seed;
      },
      {}
    )
);
