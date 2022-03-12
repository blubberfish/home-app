import {
  combineReducers,
  Slice,
  SliceCaseReducers,
  Store,
} from '@reduxjs/toolkit';

type ModuleRegistry = {
  [key: Slice['name']]: Slice['reducer'];
};

const factory = () => {
  const staticModules: ModuleRegistry = {};
  const dynamicModules: ModuleRegistry = {};

  const getCurrentReducers = () => ({
    ...staticModules,
    ...dynamicModules,
  });

  return {
    getCurrentReducers,
    registerStaticModules: (slices: Slice[]) =>
      slices.forEach((slice) => (staticModules[slice.name] = slice.reducer)),
    mountToStore: <
      State,
      CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
      Name extends string = string
    >(
      slice: Slice<State, CaseReducers, Name>,
      store: Store
    ) => {
      if (!dynamicModules[slice.name]) {
        dynamicModules[slice.name] = slice.reducer;
        store.replaceReducer(combineReducers(getCurrentReducers()));
      }
    },
    unmountFromStore: <
      State,
      CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
      Name extends string = string
    >(
      slice: Slice<State, CaseReducers, Name>,
      store: Store
    ) => {
      if (dynamicModules[slice.name]) {
        delete dynamicModules[slice.name];
        store.replaceReducer(combineReducers(getCurrentReducers()));
      }
    },
  };
};

export const {
  mountToStore,
  unmountFromStore,
  getCurrentReducers,
  registerStaticModules,
} = factory();
