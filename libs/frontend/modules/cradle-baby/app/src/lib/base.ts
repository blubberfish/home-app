import {
  AccountInfoPayload,
  PersonEntityPayload,
  BabyActivityType,
} from '@blubberfish/types';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

export const name = 'app';

export const storage = {
  accountId: {
    get: () => localStorage.getItem('u'),
    set: (value?: string | null) => {
      if (!value) {
        localStorage.removeItem('u');
      } else {
        localStorage.setItem('u', value);
      }
    },
  },
};

export const childPersonEntity = createEntityAdapter<PersonEntityPayload>({
  selectId: (model) => model.uuid,
  sortComparer: (e1, e2) => Date.parse(e1.dtob) - Date.parse(e2.dtob),
});

export type CustomColorMap = {
  activity: {
    [key in BabyActivityType]: string;
  };
  gender: {
    [key in 'm' | 'f']: string;
  };
};

export const defaultColorMap: CustomColorMap = {
  activity: {
    'baby:activity:feed': 'LightSkyBlue',
    'baby:activity:nurse': 'LightSalmon',
    'baby:activity:sleep': 'MediumSeaGreen',
    'baby:activity:wake': 'PaleVioletRed',
  },
  gender: {
    f: 'lightpink',
    m: 'powderblue',
  },
};

export type AppState = {
  account?: string | null;
  accountInfo?: AccountInfoPayload | null;
  children: EntityState<PersonEntityPayload>;
  colors: CustomColorMap;
};

export const getInitialState = (): AppState => ({
  account: storage.accountId.get(),
  accountInfo: null,
  children: childPersonEntity.getInitialState(),
  colors: defaultColorMap,
});
