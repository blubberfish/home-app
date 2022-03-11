import { useEffect } from 'react';
import { combineReducers, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { dynamicSlices, getReducer } from './store';
import { useStore } from 'react-redux';

export const useModule = <
  State,
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  Name extends string = string
>(
  slice: Slice<State, CaseReducers, Name>
) => {
  const store = useStore();
  useEffect(() => {
    const module = dynamicSlices[slice.name];
    if (!module) {
      dynamicSlices[slice.name] = slice.reducer;
      store.replaceReducer(combineReducers(getReducer()));
    }
    return () => {
      delete dynamicSlices[slice.name];
      store.replaceReducer(combineReducers(getReducer()));
    };
  }, [slice, store]);
};
