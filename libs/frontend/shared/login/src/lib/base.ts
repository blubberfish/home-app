import { User } from '@blubberfish/types';

export type LoginState = {
  api?: {
    pending?: string;
    fulfilled?: string;
    rejected?: string;
  } | null;
  errorMessage?: string | null;
  currentUser?: Partial<User> | null;
};

export const IDENTIFIER = 'login';
