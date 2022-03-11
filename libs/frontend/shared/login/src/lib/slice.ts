import { User } from '@blubberfish/types';
import { createSlice } from '@reduxjs/toolkit';
import { LoginState, IDENTIFIER } from './base';
import { loginThunk } from './thunk';

const getInitialState = (): LoginState => ({});

export default createSlice({
  name: IDENTIFIER,
  initialState: getInitialState(),
  reducers: {
    logout(state) {
      state.api = null;
      state.currentUser = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state, { meta: { requestId } }) => {
      state.api = {
        pending: requestId,
      };
      state.currentUser = null;
      state.errorMessage = null;
    });
    builder.addCase(
      loginThunk.fulfilled,
      (state, { meta: { requestId }, payload }) => {
        if (requestId === state.api?.pending) {
          state.api.fulfilled = requestId;
          state.currentUser = payload as User;
          state.errorMessage = null;
        }
      }
    );
    builder.addCase(
      loginThunk.rejected,
      (state, { meta: { requestId }, error }) => {
        if (requestId === state.api?.pending) {
          state.api.rejected = requestId;
          state.currentUser = null;
          state.errorMessage = error.message;
        }
      }
    );
  },
});
