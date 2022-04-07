import {
  BabyActivityProfilePayload,
  BabyActivityType,
} from '@blubberfish/types';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

export const name = 'dashboard.history.activities';

export const activityEntity = createEntityAdapter<BabyActivityProfilePayload>({
  selectId: (model) => model._id,
  sortComparer: (e1, e2) => e1.timestamp.localeCompare(e2.timestamp),
});

export type PendingAction = {
  id: string | number;
  active?: boolean | null;
  action: () => Promise<void>;
};

export type Alert = {
  title: string;
  message: string;
};

export type Filter = {
  [key in BabyActivityType]: boolean;
};

export type DashboardActivitiesState = {
  alert?: Alert | null;
  pending?: PendingAction | null;
  activities: EntityState<BabyActivityProfilePayload>;
  filter: Filter;
};

export const getInitialState = (): DashboardActivitiesState => ({
  activities: activityEntity.getInitialState(),
  filter: {
    'baby:activity:feed': false,
    'baby:activity:nurse': false,
    'baby:activity:sleep': false,
    'baby:activity:wake': false,
  },
});
