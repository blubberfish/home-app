import { CurrentUser } from '@blubberfish/types';

export const IDENTIFIER = 'app_session' as const;

export type SessionState = {
  user?: CurrentUser | null;
};

export const getInitialState = (): SessionState => ({});
