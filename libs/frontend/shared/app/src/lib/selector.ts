import { IDENTIFIER, AppState } from './base';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appStateSelector = (state: any): AppState | undefined =>
  state[IDENTIFIER];
