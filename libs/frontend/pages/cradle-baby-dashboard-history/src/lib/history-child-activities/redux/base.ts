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
  [key in BabyActivityType]?: boolean;
};

export type DashboardActivitiesState = {
  alert?: Alert | null;
  pending?: PendingAction | null;
  activities: EntityState<BabyActivityProfilePayload>;
  filter: Filter;
};

export const defaultFilter: Filter = {
  'baby:activity:feed': true,
  'baby:activity:feed:bottle': true,
  'baby:activity:feed:latch:l': true,
  'baby:activity:feed:latch:r': true,
  'baby:activity:nurse': true,
  'baby:activity:nurse:defecate': true,
  'baby:activity:nurse:urinate': true,
  'baby:activity:sleep': true,
  // 'baby:activity:wake': true,
};

export const getInitialState = (): DashboardActivitiesState => ({
  activities: activityEntity.getInitialState(),
  filter: defaultFilter,
});
