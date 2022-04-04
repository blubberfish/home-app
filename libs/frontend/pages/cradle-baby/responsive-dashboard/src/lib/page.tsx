import { Navigate, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout';

const Empty = () => null;

export const DashboardPage = () => (
  <Routes>
    <Route element={<DashboardLayout nav={[]} />}>
      <Route path="family/*" element={<Empty />} />
      <Route path="log/*" element={<Empty />} />
      <Route path="activities/*" element={<Empty />} />
      <Route path="*" element={<Navigate to="family" />} />
    </Route>
  </Routes>
);
