export const name = 'dashboard.family.child-details';

export type Alert = {
  type?: 'error' | 'success';
  title: string;
  message: string;
};

export type PendingAction = {
  id: string;
  started?: boolean;
  action: () => Promise<void>;
};

export type FamilyAddChildState = {
  alert?: Alert | null;
  pending?: PendingAction | null;
};

export const getInitialState = (): FamilyAddChildState => ({
  alert: null,
  pending: null,
});
