import { getBabyActivityLog } from '@blubberfish/services/client';
import { BabyActivityPayload } from '@blubberfish/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './base';
import { replaceActivityDataSet } from './slice';

export const activityLogThunk = createAsyncThunk(
  `${name}/get/activities`,
  async (input: BabyActivityPayload, { dispatch }) => {
    try {
      const data = await getBabyActivityLog(input);
      data && dispatch(replaceActivityDataSet(data));
    } catch (e) {
      console.error(e);
    }
  }
);
