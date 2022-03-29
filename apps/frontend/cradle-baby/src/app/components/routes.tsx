import { lazy, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';

const LoginPage = lazy(
  () => import('@blubberfish/frontend/pages/cradle-baby-login')
);
const RegisterPage = lazy(
  () => import('@blubberfish/frontend/pages/cradle-baby-register')
);

const Empty = () => null;

export default () => (
  <Suspense fallback={<Empty />}>
    <Routes>
      <Route path={PATH.DASHBOARD} element={<Empty />} />
      <Route path={PATH.REGISTER} element={<RegisterPage />} />
      <Route path={PATH.LOGIN} element={<LoginPage />} />
      <Route path={PATH.ALL} element={<Navigate to={PATH.LOGIN} />} />
    </Routes>
  </Suspense>
);
