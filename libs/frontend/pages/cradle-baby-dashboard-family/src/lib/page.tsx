import { DASHBOARD_FAMILY_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { Navigate, Routes, Route } from 'react-router-dom';
import { Overview } from './overview';

const Empty = () => null;

const DashboardFamilyPage = () => (
  <Routes>
    <Route path={DASHBOARD_FAMILY_PATH.OVERVIEW} element={<Overview />} />
    <Route path={DASHBOARD_FAMILY_PATH.CHILD} element={<Empty />} />
    <Route
      path="*"
      element={<Navigate to={DASHBOARD_FAMILY_PATH.OVERVIEW} />}
    />
  </Routes>
);

export default () => <DashboardFamilyPage />;
