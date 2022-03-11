import { createSlice } from '@reduxjs/toolkit';

export const IDENTIFIER = 'login';

const loginSlice = createSlice({
  name: IDENTIFIER,
  initialState: {
    pending: false,
  },
  reducers: {
    setPending(state) {
      state.pending = true;
    },
  },
});

export default loginSlice;
