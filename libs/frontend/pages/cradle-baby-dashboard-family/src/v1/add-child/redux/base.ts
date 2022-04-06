export const name = 'dashboard.family.add_child' as const;

export type DashboardFamilyAddChildState = {
  alert?: {
    title: string;
    message: string;
  } | null;
};

export const getInitialState = (): DashboardFamilyAddChildState => ({
  alert: null,
});
