import { DASHBOARD_ACTIVITIES_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

// const AddChild = lazy(() => import('./add-child'));
// const ChildDetails = lazy(() => import('./child-details'));
// const Overview = lazy(() => import('./overview'));
const Empty = () => null

const DashboardActivitiesPage = () => (
  <Routes>
    <Route path={DASHBOARD_ACTIVITIES_PATH.children} element={<Empty />} />
    <Route path={DASHBOARD_ACTIVITIES_PATH.log} element={<Empty />} />
    <Route
      path="*"
      element={<Navigate to={DASHBOARD_ACTIVITIES_PATH.children} />}
    />
  </Routes>
);

export default () => <DashboardActivitiesPage />;
