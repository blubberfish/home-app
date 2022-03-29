import { lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';

const DashboardPage = lazy(
  () => import('@blubberfish/frontend/pages/cradle-baby-dashboard')
);

export default () => (
  <Routes>
    <Route path={PATH.DASHBOARD} element={<DashboardPage />} />
    <Route path={PATH.ALL} element={<Navigate to={PATH.DASHBOARD} />} />
  </Routes>
);
