import { useCallback, useState } from 'react';

export type Action = () => Promise<void>;
export type ActionState = 'none' | 'staged' | 'running';
export type PendingAction = {
  id: number | string;
  action: Action;
  message?: string;
};
export const usePendingAction = (): [
  PendingAction | undefined,
  (
    state?:
      | PendingAction
      | ((state?: PendingAction) => PendingAction | undefined)
  ) => void,
  () => void,
  () => void
] => {
  const [pendingAction, setPendingAction] = useState<PendingAction>();
  const execute = useCallback(() => {
    if (!pendingAction) return;
    const { action } = pendingAction;
    action().finally(() => {
      setPendingAction(() => undefined);
    });
  }, [pendingAction]);
  const cancel = useCallback(() => {
    setPendingAction(() => undefined);
  }, []);

  return [pendingAction, setPendingAction, execute, cancel];
};
