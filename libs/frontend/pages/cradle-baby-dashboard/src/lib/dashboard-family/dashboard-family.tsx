import { Routes, Route } from 'react-router-dom'
import { PATH } from '../dashboard-paths';

import AddChildPage from './add-child'

const Empty = () => null

const DashboardFamilyPage = () => {
  return (
    <Routes>
      <Route path={PATH.ADD_ADULT} element={<Empty />} />
      <Route path={PATH.ADD_CHILD} element={<AddChildPage />} />
    </Routes>
  );
};

export default () => <DashboardFamilyPage />;
