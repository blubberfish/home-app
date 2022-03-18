import { configureStore, Slice } from '@reduxjs/toolkit';
import { getCurrentReducers, registerStaticModules } from './modules';
import { Environment } from '@blubberfish/types';

export const createStore = (slices: Slice[]) => {
  registerStaticModules(slices);
  return configureStore({
    reducer: getCurrentReducers(),
    devTools: process.env['NODE_ENV'] === Environment.Dev,
  });
};

export type GlobalState<S, I extends string = string> = {
  [key in I]: S;
};
