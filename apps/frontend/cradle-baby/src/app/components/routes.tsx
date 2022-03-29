import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';

const LoginPage = lazy(
  () => import('@blubberfish/frontend/pages/cradle-baby-login')
);
const NewUserPage = lazy(() => import('./pages/new-user'));

const Empty = () => null;

export default () => (
  <Suspense fallback={<Empty />}>
    <Routes>
      <Route path={PATH.REGISTER} element={<NewUserPage />} />
      <Route path={PATH.LOGIN} element={<LoginPage />} />
      <Route path={PATH.ALL} element={<Empty />} />
    </Routes>
  </Suspense>
);
