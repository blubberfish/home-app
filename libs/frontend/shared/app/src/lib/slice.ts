import { createSlice } from '@reduxjs/toolkit';
import { AppState, IDENTIFIER } from './base';

const getInitialState = (): AppState => ({});

export default createSlice({
  name: IDENTIFIER,
  initialState: getInitialState(),
  reducers: {},
});
