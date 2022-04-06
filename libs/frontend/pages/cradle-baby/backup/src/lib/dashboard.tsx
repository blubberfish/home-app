import { PATH as MAIN_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { DashboardPageLayout } from './dashboard-layout';
import { PATH } from './dashboard-paths';

const DashboardActivitiesPage = lazy(() => import('./dashboard-activities'));
const DashboardBabyPage = lazy(() => import('./dashboard-baby'));
const DashboardFamilyPage = lazy(() => import('./dashboard-family'));

const DashboardPage = () => (
  <Routes>
    <Route element={<DashboardPageLayout />}>
      <Route
        path={`${PATH.ACTIVITIES}/*`}
        element={<DashboardActivitiesPage />}
      />
      <Route path={`${PATH.BABY}/*`} element={<DashboardBabyPage />} />
      <Route path={`${PATH.FAMILY}/*`} element={<DashboardFamilyPage />} />
      <Route
        path="*"
        element={<Navigate to={`/${MAIN_PATH.DASHBOARD}/${PATH.FAMILY}`} />}
      />
    </Route>
  </Routes>
);

export default DashboardPage;
