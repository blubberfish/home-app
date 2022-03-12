import { CurrentUser } from '@blubberfish/types';

export const IDENTIFIER = 'login';

export type LoginState = {
  user?: CurrentUser | null;
};
