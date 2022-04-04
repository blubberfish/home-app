import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';

const DashboardPage = lazy(
  () => import('@blubberfish/frontend/pages/cradle-baby-dashboard')
);
const ResponsiveDashboardPage = lazy(
  () => import('@blubberfish/frontend/pages/cradle-baby/responsive-dashboard')
);

export default () => (
  <Routes>
    <Route path={`responsive/*`} element={<ResponsiveDashboardPage />} />
    <Route path={`${PATH.DASHBOARD}/*`} element={<DashboardPage />} />
    <Route
      path={`${PATH.ALL}`}
      element={<Navigate to={`/${PATH.DASHBOARD}`} />}
    />
  </Routes>
);
