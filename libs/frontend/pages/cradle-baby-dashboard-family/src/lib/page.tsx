import { DASHBOARD_FAMILY_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

const AddChild = lazy(() => import('./add-child'));
const ChildDetails = lazy(() => import('./child-details'));
const Overview = lazy(() => import('./overview'));

const DashboardFamilyPage = () => (
  <Routes>
    <Route path={DASHBOARD_FAMILY_PATH.OVERVIEW} element={<Overview />} />
    <Route path={DASHBOARD_FAMILY_PATH.ADD_CHILD} element={<AddChild />} />
    <Route path={DASHBOARD_FAMILY_PATH.CHILD} element={<ChildDetails />} />
    <Route
      path="*"
      element={<Navigate to={DASHBOARD_FAMILY_PATH.OVERVIEW} />}
    />
  </Routes>
);

export default () => <DashboardFamilyPage />;
