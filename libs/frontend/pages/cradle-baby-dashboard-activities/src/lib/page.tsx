import { DASHBOARD_ACTIVITIES_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

const List = lazy(() => import('./activities-child-list.tsx'));
const Log = lazy(() => import('./activities-log'));

const DashboardActivitiesPage = () => (
  <Routes>
    <Route path={DASHBOARD_ACTIVITIES_PATH.CHILDREN} element={<List />} />
    <Route path={DASHBOARD_ACTIVITIES_PATH.LOG} element={<Log />} />
    <Route
      path="*"
      element={<Navigate to={DASHBOARD_ACTIVITIES_PATH.CHILDREN} />}
    />
  </Routes>
);

export default () => <DashboardActivitiesPage />;
