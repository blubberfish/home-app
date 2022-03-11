import { configureStore, Slice } from '@reduxjs/toolkit';
import appSlice from '@blubberfish/frontend/shared/app';

export type ModuleReducerMap = { [key: Slice['name']]: Slice['reducer'] };

export const rootSlices: ModuleReducerMap = {
  [appSlice.name]: appSlice.reducer,
};

export const dynamicSlices: ModuleReducerMap = {};

export const getReducer = () => ({
  ...rootSlices,
  ...dynamicSlices,
});

export default configureStore({
  reducer: getReducer(),
  devTools: process.env['NODE_ENV'] === 'development',
});
