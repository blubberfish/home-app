import { ReactNode } from 'react';
import { Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { useModule } from './hooks';

export type ModuleProps<
  State,
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  Name extends string = string
> = {
  slice: Slice<State, CaseReducers, Name>;
  children?: ReactNode;
};

export const Module = <
  State,
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  Name extends string = string
>({
  children,
  slice,
}: ModuleProps<State, CaseReducers, Name>) => {
  useModule(slice);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
