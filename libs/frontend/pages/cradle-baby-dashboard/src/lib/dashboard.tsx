import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom';
import { DashboardPageLayout } from './dashboard-layout';
import { PATH } from './dashboard-paths';

const DashboardFamilyPage = lazy(() => import('./dashboard-family'))

const Empty = ({ label }: { label?: string }) => <div>{label}</div>;

const DashboardPage = () => (
  <Routes>
    <Route element={<DashboardPageLayout />}>
      <Route
        path={`${PATH.ACTIVITIES}/*`}
        element={<Empty label="ACTIVITIES" />}
      />
      <Route path={`${PATH.BABY}/*`} element={<Empty label="BABY" />} />
      <Route path={`${PATH.FAMILY}/*`} element={<DashboardFamilyPage />} />
      <Route path="*" element={<Empty />} />
    </Route>
  </Routes>
);

export default DashboardPage;
