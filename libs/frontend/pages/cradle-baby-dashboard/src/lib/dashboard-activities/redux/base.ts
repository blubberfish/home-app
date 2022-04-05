import {
  BabyActivityType,
  BabyActivityProfilePayload,
} from '@blubberfish/types';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

export const name = 'dashboard.activities';

export type VisualizationColors = { [key in BabyActivityType]: string };

export const activityEntity = createEntityAdapter<BabyActivityProfilePayload>({
  selectId: (model) => model._id,
  sortComparer: (e1, e2) => e1.timestamp.localeCompare(e2.timestamp),
});

export type DashboardActivitiesState = {
  baby?: string | null;
  dataSetLoading?: boolean | null;
  activities: EntityState<BabyActivityProfilePayload>;
  colors: VisualizationColors;
};

export const getInitialState = (): DashboardActivitiesState => ({
  baby: null,
  dataSetLoading: null,
  activities: activityEntity.getInitialState(),
  colors: {
    'baby:activity:feed': 'goldenrod',
    'baby:activity:sleep': 'forestgreen',
    'baby:activity:wake': 'tomato',
    'baby:activity:nurse': 'skyblue',
  },
});
