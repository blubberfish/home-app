import { DASHBOARD_FAMILY_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { Routes, Route } from 'react-router-dom';

import AddChildPage from './add-child';
import FamilyOverviewPage from './overview';

const Empty = () => null;

const DashboardFamilyPage = () => {
  return (
    <Routes>
      <Route path={DASHBOARD_FAMILY_PATH.ADD_ADULT} element={<Empty />} />
      <Route
        path={DASHBOARD_FAMILY_PATH.ADD_CHILD}
        element={<AddChildPage />}
      />
      <Route index element={<FamilyOverviewPage />} />
    </Routes>
  );
};

export default () => <DashboardFamilyPage />;
