import { login } from '@blubberfish/services/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDENTIFIER } from './base';

export const loginThunk = createAsyncThunk(
  `${IDENTIFIER}/log/in`,
  (payload: { username: string; password: string }) => {
    return login(payload);
  }
);
