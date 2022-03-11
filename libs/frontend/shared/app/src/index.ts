import { createSlice } from '@reduxjs/toolkit';

export const IDENTIFIER = 'app';

export default createSlice({
  name: IDENTIFIER,
  initialState: {
    ready: false,
  },
  reducers: {},
});
