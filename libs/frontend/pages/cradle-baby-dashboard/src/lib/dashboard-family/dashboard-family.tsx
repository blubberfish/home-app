import { Routes, Route } from 'react-router-dom';

import AddChildPage from './add-child';
import { DashboardFamilyOverview } from './dashboard-family-overview';
import { PATH } from '../dashboard-paths';

const Empty = () => null;

const DashboardFamilyPage = () => {
  return (
    <Routes>
      <Route path={PATH.ADD_ADULT} element={<Empty />} />
      <Route path={PATH.ADD_CHILD} element={<AddChildPage />} />
      <Route index element={<DashboardFamilyOverview />} />
    </Routes>
  );
};

export default () => <DashboardFamilyPage />;
