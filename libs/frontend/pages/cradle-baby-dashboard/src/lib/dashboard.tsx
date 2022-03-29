import { Routes, Route } from 'react-router-dom';
import { DashboardPageLayout } from './dashboard-layout';
import { PATH } from './dashboard-paths';

const Empty = ({ label }: { label?: string }) => <div>{label}</div>;

const DashboardPage = () => (
  <Routes>
    <Route element={<DashboardPageLayout />}>
      <Route
        path={`${PATH.ACTIVITIES}/*`}
        element={<Empty label="ACTIVITIES" />}
      />
      <Route path={`${PATH.BABY}/*`} element={<Empty label="BABY" />} />
      <Route path={`${PATH.FAMILY}/*`} element={<Empty label="FAMILY" />} />
      <Route path="*" element={<Empty />} />
    </Route>
  </Routes>
);

export default DashboardPage;
