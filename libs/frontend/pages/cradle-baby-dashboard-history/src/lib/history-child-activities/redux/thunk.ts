import { getBabyActivityLog } from '@blubberfish/services/client';
import { BabyActivityPayload } from '@blubberfish/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './base';
import { setAlert, replaceActivityDataSet } from './slice';

export const activityLogThunk = createAsyncThunk(
  `${name}/get/activities`,
  async (input: BabyActivityPayload, { dispatch }) => {
    try {
      const data = await getBabyActivityLog(input);
      data && dispatch(replaceActivityDataSet(data));
    } catch (e) {
      process.env['ENV'] === 'developement' && console.error(e);
      dispatch(
        setAlert({
          title: 'Unable to retrieve history',
          message:
            'Something went wrong and the data cannot be loaded. Please try again.',
        })
      );
    }
  }
);
