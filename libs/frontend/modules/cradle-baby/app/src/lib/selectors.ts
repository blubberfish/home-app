import { GlobalState } from '@blubberfish/frontend/modules/core';
import { AccountInfo } from '@blubberfish/types';
import { createSelector } from '@reduxjs/toolkit';
import { name, AppState, childPersonEntity } from './base';

const stateSelector = (state: GlobalState<AppState, typeof name>) =>
  state[name];

const childrenEntityStateSelector = createSelector(
  stateSelector,
  (state) => state?.children ?? childPersonEntity.getInitialState()
);

export const accountIdSelector = createSelector(
  stateSelector,
  (state) => state?.account
);

export const accountInfoSelector = createSelector(stateSelector, (state) => {
  const info = state?.accountInfo;
  if (info) {
    return {
      ...info,
      family: {
        children: info.family.children.map((child) => ({
          ...child,
          dtob: new Date(child.dtob),
        })),
        parents: info.family.parents.map((parent) => ({
          ...parent,
          dtob: new Date(parent.dtob),
        })),
      },
    } as AccountInfo;
  }
  return null;
});

const { selectAll, selectById } = childPersonEntity.getSelectors(
  childrenEntityStateSelector
);

export const selectAllChildren = selectAll;
export const selectChildById =
  (id?: string) => (state: GlobalState<AppState, typeof name>) =>
    id ? selectById(state, id) : null;
