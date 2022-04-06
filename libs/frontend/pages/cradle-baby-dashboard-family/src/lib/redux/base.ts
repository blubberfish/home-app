import { PersonEntity } from '@blubberfish/types';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

export const name = 'dashboard.family.overview';

export const childEntity = createEntityAdapter<PersonEntity>();

export type OverviewState = {
  children: EntityState<PersonEntity>;
};

export const getInitialState = (): OverviewState => ({
  children: childEntity.getInitialState(),
});
