import { BabyActivityProfilePayload } from '@blubberfish/types';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

export const name = 'dashboard.history.activities';

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
  pending?: PendingAction | null;
  activities: EntityState<BabyActivityProfilePayload>;
};

export const getInitialState = (): DashboardActivitiesState => ({
  activities: activityEntity.getInitialState(),
});
