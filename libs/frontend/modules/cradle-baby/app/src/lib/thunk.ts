import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccountInfo } from '@blubberfish/services/client';
import { name } from './base';
import { setAccountInfo } from './slice';

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
