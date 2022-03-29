import { Navigate, Routes, Route } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';

const Empty = () => null;

export default () => (
  <Routes>
    <Route path={PATH.DASHBOARD} element={<Empty />} />
    <Route path={PATH.ALL} element={<Navigate to={PATH.DASHBOARD} />} />
  </Routes>
);
