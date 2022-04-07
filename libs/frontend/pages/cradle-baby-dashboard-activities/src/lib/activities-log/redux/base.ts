export const name = 'dashboard.activities.log';

export type Alert = {
  title: string;
  message: string;
};

export type PendingAction = {
  active?: boolean;
  id: string;
  action: () => Promise<void>;
};

export type ActivitiesLogState = {
  alert?: Alert | null;
  pending?: PendingAction | null;
};

export const getInitialState = (): ActivitiesLogState => ({
  alert: null,
  pending: null,
});
