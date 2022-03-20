import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/routes'

const HomePage = lazy(() => import('@blubberfish/frontend/pages/public/home'));
const LoginPage = lazy(
  () => import('@blubberfish/frontend/pages/public/login')
);

/** @todo */
const Empty = () => null

export default () => (
  <BrowserRouter>
    <Suspense fallback={<Empty />}>
      <Routes>
        <Route path={PATH.PUBLIC.LOGIN} element={<LoginPage />} />
        <Route path={PATH.ALL} element={<HomePage />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
