import { useCallback, useState } from 'react';

export type Action = () => Promise<void>;
export type ActionState = 'none' | 'staged' | 'running';
export type PendingAction = {
  action: Action;
  message?: string;
};
export const usePendingAction = () => {
  const [pendingAction, setPendingAction] = useState<PendingAction>();
  const execute = useCallback(() => {
    if (!pendingAction) return;
    const { action } = pendingAction;
    action().finally(() => {
      setPendingAction(() => undefined);
    });
  }, [pendingAction]);

  return [pendingAction, setPendingAction, execute];
};
