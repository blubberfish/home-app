import { createSlice } from '@reduxjs/toolkit';
import { name, getInitialState } from './base';

const slice = createSlice({
  name,
  initialState: getInitialState(),
  reducers: {
    openMenu(state) {
      state.menu = true;
    },
    closeMenu(state) {
      state.menu = false;
    },
  },
});

export default slice;
export const { closeMenu, openMenu } = slice.actions;
