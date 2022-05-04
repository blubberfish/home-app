import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccountInfo } from '@blubberfish/services/client';
import { name } from './base';
import { setAccountInfo, setAccountId } from './slice';

export const accountInfoThunk = createAsyncThunk(
  `${name}/thunk/get/account-info`,
  async (id: string, { dispatch }) => {
    if (!id) {
      return;
    }
    const info = await getAccountInfo(id);
    info && dispatch(setAccountInfo(info));
  }
);

export const exitThunk = createAsyncThunk(
  `${name}/thunk/exit`,
  async (_, { dispatch }) => {
    dispatch(setAccountId(null));
    dispatch(setAccountInfo(null));
  }
);
