import { BabyActivityProfilePayload } from '@blubberfish/types';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

export const name = 'dashboard.activities';

export const activityEntity = createEntityAdapter<BabyActivityProfilePayload>({
  selectId: (model) => model._id,
  sortComparer: (e1, e2) => e1.timestamp.localeCompare(e2.timestamp),
});

export type DashboardActivitiesState = {
  baby?: string | null;
  activities: EntityState<BabyActivityProfilePayload>;
};

export const getInitialState = (): DashboardActivitiesState => ({
  baby: null,
  activities: activityEntity.getInitialState(),
});
