export const name = 'dashboard.activities';

export type DashboardActivitiesState = {
  baby?: string | null;
};

export const getInitialState = (): DashboardActivitiesState => ({
  baby: null,
});
