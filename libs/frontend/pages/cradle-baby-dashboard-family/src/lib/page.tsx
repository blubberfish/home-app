import { DASHBOARD_FAMILY_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { Navigate, Routes, Route } from 'react-router-dom';
import { Overview } from './overview';

const DashboardFamilyPage = () => (
  <Routes>
    <Route path={DASHBOARD_FAMILY_PATH.OVERVIEW} element={<Overview />} />
    <Route
      path="*"
      element={<Navigate to={DASHBOARD_FAMILY_PATH.OVERVIEW} />}
    />
  </Routes>
);

export default () => <DashboardFamilyPage />;
