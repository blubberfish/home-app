import { useEffect } from 'react';
import { Slice, SliceCaseReducers } from '@reduxjs/toolkit';
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
      store.replaceReducer(getReducer());
    }
    console.log('dynamicSlices', dynamicSlices);
    return () => {
      console.log('unmount:dynamicSlices', dynamicSlices);
      delete dynamicSlices[slice.name];
      store.replaceReducer(getReducer());
    };
  }, [slice, store]);
};
