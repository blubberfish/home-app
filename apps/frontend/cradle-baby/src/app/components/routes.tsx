import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/routes';

const HomePage = lazy(() => import('./pages/login'));

const Empty = () => null;

export default () => (
  <Suspense fallback={<Empty />}>
    <Routes>
      <Route path={PATH.ALL} element={<HomePage />} />
    </Routes>
  </Suspense>
);
