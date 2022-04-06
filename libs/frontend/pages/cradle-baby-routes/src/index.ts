export const PATH = {
  DASHBOARD: 'dashboard',
  REGISTER: 'register',
  LOGIN: 'login',
  ALL: '*',
};

export const DASHBOARD_PATH = {
  FAMILY: 'family',
  ACTIVITIES: 'activities',
  HISTORY: 'history',
  SETTINGS: 'settings',
};

export const DASHBOARD_FAMILY_PATH = {
  OVERVIEW: 'overview',
  ADD_ADULT: 'adult/new',
  ADD_CHILD: 'child/new',
  CHILD: 'child/details/:id',
};

export const DASHBOARD_ACTIVITIES_PATH = {
  children: 'list',
  log: 'child/:uuid',
};
