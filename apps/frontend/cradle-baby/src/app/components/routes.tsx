import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/routes';

const LoginPage = lazy(() => import('./pages/login'));

const Empty = () => null;

export default () => (
  <Suspense fallback={<Empty />}>
    <Routes>
      <Route path={PATH.PUBLIC.LOGIN} element={<LoginPage />} />
      <Route path={PATH.ALL} element={<Empty />} />
    </Routes>
  </Suspense>
);
