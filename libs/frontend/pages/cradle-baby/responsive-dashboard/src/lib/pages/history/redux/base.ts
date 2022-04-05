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

export type PendingAction = {
  id: string | number;
  action: () => Promise<void>;
  running?: boolean | null;
};

export type Alert = {
  title: string;
  message: string;
};

export type DashboardActivitiesState = {
  alert?: Alert | null;
  baby?: string | null;
  pending?: PendingAction | null;
  activities: EntityState<BabyActivityProfilePayload>;
  colors: VisualizationColors;
};

export const getInitialState = (): DashboardActivitiesState => ({
  baby: null,
  activities: activityEntity.getInitialState(),
  colors: {
    'baby:activity:feed': 'goldenrod',
    'baby:activity:sleep': 'forestgreen',
    'baby:activity:wake': 'tomato',
    'baby:activity:nurse': 'skyblue',
  },
});
