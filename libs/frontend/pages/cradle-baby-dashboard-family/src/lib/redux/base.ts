import { PersonEntity } from '@blubberfish/types';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

export const name = 'dashboard.family.overview';

export const childEntity = createEntityAdapter<PersonEntity>();

export type PendingAction = {
  id: string;
  action: () => Promise<void>;
};

export type OverviewState = {
  pending?: PendingAction | null;
  children: EntityState<PersonEntity>;
};

export const getInitialState = (): OverviewState => ({
  children: childEntity.getInitialState(),
});
