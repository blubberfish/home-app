export const name = 'dashboard.baby';

export type DashboardBabyState = {
  baby?: string | null;
};

export const getInitialState = (): DashboardBabyState => ({
  baby: null,
});
