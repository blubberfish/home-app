import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/routes';

const LoginPage = lazy(() => import('./pages/login'));
const NewUserPage = lazy(() => import('./pages/new-user'));

const Empty = () => null;

export default () => (
  <Suspense fallback={<Empty />}>
    <Routes>
      <Route path={PATH.PUBLIC.NEW_USER} element={<NewUserPage />} />
      <Route path={PATH.PUBLIC.LOGIN} element={<LoginPage />} />
      <Route path={PATH.ALL} element={<Empty />} />
    </Routes>
  </Suspense>
);
