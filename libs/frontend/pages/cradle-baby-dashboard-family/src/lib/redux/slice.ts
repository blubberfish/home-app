import { PersonEntity } from '@blubberfish/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { name, childEntity, getInitialState } from './base';

const slice = createSlice({
  name,
  initialState: getInitialState(),
  reducers: {
    updateDataSet(state, { payload }: PayloadAction<PersonEntity[]>) {
      state.children = childEntity.setAll(
        childEntity.removeAll(state.children),
        payload
      );
    },
  },
});

export default slice;
export const { updateDataSet } = slice.actions;
