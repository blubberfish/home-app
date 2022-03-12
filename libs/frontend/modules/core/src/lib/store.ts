import { configureStore } from '@reduxjs/toolkit';
import { getCurrentReducers, registerStaticModules } from './modules';

export const createStore = () =>
  configureStore({
    reducer: getCurrentReducers(),
  });
