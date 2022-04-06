export const name = 'dashboard.family.add-child';

export type PendingAction = {
  id: string;
  started: boolean;
  action: () => Promise<void>;
};

export type FamilyAddChildState = {
  pending?: PendingAction | null;
};

export const getInitialState = (): FamilyAddChildState => ({
  pending: null,
});
