import { PATH as MAIN_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { DashboardPageLayout } from './dashboard-layout';
import { PATH } from './dashboard-paths';

const DashboardBabyPage = lazy(() => import('./dashboard-baby'));
const DashboardFamilyPage = lazy(() => import('./dashboard-family'));

const Empty = ({ label }: { label?: string }) => <div>{label}</div>;

const DashboardPage = () => (
  <Routes>
    <Route element={<DashboardPageLayout />}>
      <Route
        path={`${PATH.ACTIVITIES}/*`}
        element={<Empty label="ACTIVITIES" />}
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
