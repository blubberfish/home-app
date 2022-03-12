import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { mountToStore, unmountFromStore } from './modules';

export const useModule = <
  State,
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  Name extends string = string
>(
  slice: Slice<State, CaseReducers, Name>
) => {
  const store = useStore();
  useEffect(() => {
    mountToStore(slice, store);
    return () => {
      unmountFromStore(slice, store);
    };
  }, [slice, store]);
};
