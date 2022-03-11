import { User } from '@blubberfish/types';

export type AppState = {
  currentUser?: User;
};

export const IDENTIFIER = 'app';
