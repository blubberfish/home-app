import { Routes, Route } from 'react-router-dom';
import { DashboardPageLayout } from './dashboard-layout';

const Empty = () => <div></div>;

const DashboardPage = () => (
  <Routes>
    <Route element={<DashboardPageLayout />}>
      <Route path="*" element={<Empty />} />
    </Route>
  </Routes>
);

export default DashboardPage;
