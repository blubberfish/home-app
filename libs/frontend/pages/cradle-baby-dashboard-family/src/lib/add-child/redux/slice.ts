import { CreatePersonEntityPayload } from '@blubberfish/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert, name, getInitialState, PendingAction } from './base';

const slice = createSlice({
  name,
  initialState: getInitialState(),
  reducers: {
    setPending(state, { payload }: PayloadAction<PendingAction>) {
      state.pending = payload;
    },
    dismissPending(state) {
      state.pending = null;
    },
    confirmPending(state) {
      if (state.pending) {
        state.pending.started = true;
      }
    },
    dismissAlert(state) {
      state.alert = null;
    },
    setAlert(state, { payload }: PayloadAction<Alert>) {
      state.alert = payload;
    },
    setDateTimeOfBirth(state, { payload }: PayloadAction<string>) {
      if (!state.form) {
        state.form = {};
      }
      state.form.dtob = payload;
    },
    setFamilyName(
      state,
      {
        payload: { language, value },
      }: PayloadAction<{
        language: keyof CreatePersonEntityPayload['name'];
        value: string;
      }>
    ) {
      if (!state.form) {
        state.form = {};
      }
      if (!state.form.name) {
        state.form.name = {};
      }
      if (!state.form.name[language]) {
        state.form.name[language] = {
          family: '',
          given: '',
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.form.name[language]!.family = value;
    },
    setGivenName(
      state,
      {
        payload: { language, value },
      }: PayloadAction<{
        language: keyof CreatePersonEntityPayload['name'];
        value: string;
      }>
    ) {
      if (!state.form) {
        state.form = {};
      }
      if (!state.form.name) {
        state.form.name = {};
      }
      if (!state.form.name[language]) {
        state.form.name[language] = {
          family: '',
          given: '',
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.form.name[language]!.given = value;
    },
    setPreferredName(
      state,
      {
        payload: { language, value },
      }: PayloadAction<{
        language: keyof CreatePersonEntityPayload['name'];
        value: string;
      }>
    ) {
      if (!state.form) {
        state.form = {};
      }
      if (!state.form.name) {
        state.form.name = {};
      }
      if (!state.form.name[language]) {
        state.form.name[language] = {
          family: '',
          given: '',
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.form.name[language]!.preferred = value;
    },
    setGenderMale(state) {
      if (!state.form) {
        state.form = {};
      }
      state.form.gender = 'm';
    },
    setGenderFemale(state) {
      if (!state.form) {
        state.form = {};
      }
      state.form.gender = 'f';
    },
  },
});

export default slice;
export const {
  setPending,
  confirmPending,
  dismissPending,
  dismissAlert,
  setAlert,
  setDateTimeOfBirth,
  setFamilyName,
  setGenderFemale,
  setGenderMale,
  setGivenName,
  setPreferredName,
} = slice.actions;
